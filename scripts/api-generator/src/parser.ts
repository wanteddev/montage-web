import { Node, Project } from 'ts-morph';

import { Extractor } from './extractor';

import type {
  ArrowFunction,
  AsExpression,
  CallExpression,
  FunctionDeclaration,
  FunctionExpression,
  Identifier,
  SourceFile,
  VariableDeclaration,
} from 'ts-morph';
import type { ComponentInfo } from './types';

export type { Prop as PropInfo, ComponentInfo } from './types';

/**
 * TypeScript 프로젝트에서 React 컴포넌트 정보를 추출하는 파서
 */
export class Parser {
  private project: Project;
  private propsExtractor: Extractor;

  constructor(tsconfigPath: string) {
    this.project = new Project({
      tsConfigFilePath: tsconfigPath,
      skipAddingFilesFromTsConfig: false,
    });
    this.propsExtractor = new Extractor();
  }

  /**
   * 필터에 매칭되는 파일에서 export된 항목들을 수집
   */
  public getExportedItems(): Array<{
    node: Node;
    name: string;
    filePath: string;
  }> {
    const result: Array<{ node: Node; name: string; filePath: string }> = [];

    const sourceFiles = this.project.getSourceFiles();

    for (const sourceFile of sourceFiles) {
      result.push(
        ...this.collectExportsFromFile(sourceFile).filter((item) =>
          this.isPascalCase(item.name),
        ),
      );
    }

    return result;
  }

  public parse(
    declarations: ReturnType<typeof this.getExportedItems>,
  ): Array<ComponentInfo> {
    const componentInfos: Array<ComponentInfo> = [];

    for (const item of declarations) {
      const componentInfo = this.extractComponentInfo(
        item.node,
        item.name,
        item.filePath,
      );

      if (componentInfo) {
        componentInfos.push(componentInfo);
      }
    }

    return componentInfos;
  }

  private extractComponentInfo(
    node: Node,
    name: string,
    filePath: string,
  ): ComponentInfo | null {
    // Identifier인 경우 실제 선언 찾기
    if (Node.isIdentifier(node)) {
      return this.extractFromIdentifier(node, name, filePath);
    }

    // 함수 선언
    if (Node.isFunctionDeclaration(node)) {
      return this.extractFromComponentLike(node, name, filePath);
    }

    // 변수 선언
    if (Node.isVariableDeclaration(node)) {
      return this.extractFromVariableDeclaration(node, name, filePath);
    }

    return null;
  }

  private extractFromIdentifier(
    node: Identifier,
    name: string,
    filePath: string,
  ): ComponentInfo | null {
    const symbol = node.getSymbol();

    if (!symbol) {
      return null;
    }

    // 먼저 선언에서 컴포넌트 정보 추출 시도
    for (const declaration of symbol.getDeclarations()) {
      const result = this.extractComponentInfo(declaration, name, filePath);

      if (result) {
        return result;
      }
    }

    // 선언에서 추출 실패 시, 타입에서 직접 추출 (re-export된 외부 컴포넌트)
    return this.extractFromIdentifierType(node, name, filePath);
  }

  /**
   * Identifier의 타입에서 React 컴포넌트 props 추출
   * 외부 라이브러리에서 re-export된 컴포넌트 처리용
   */
  private extractFromIdentifierType(
    node: Identifier,
    name: string,
    filePath: string,
  ): ComponentInfo | null {
    const type = node.getType();
    const callSignatures = type.getCallSignatures();

    if (callSignatures.length === 0) {
      return null;
    }

    // 첫 번째 call signature의 첫 번째 파라미터가 props
    const sig = callSignatures[0];
    const params = sig.getParameters();

    if (params.length === 0) {
      return { name, props: [], filePath };
    }

    const propsParam = params[0];
    const valueDecl = propsParam.getValueDeclaration();

    if (!valueDecl) {
      return { name, props: [], filePath };
    }

    const propsType = propsParam.getTypeAtLocation(valueDecl);
    const props = this.propsExtractor.extractFromType(propsType);

    return { name, props, filePath };
  }

  private extractFromVariableDeclaration(
    node: VariableDeclaration,
    name: string,
    filePath: string,
  ): ComponentInfo | null {
    const initializer = node.getInitializer();

    // initializer가 없는 경우 (re-export) 타입에서 추출
    if (!initializer) {
      return this.extractFromVariableType(node, name, filePath);
    }

    // 화살표 함수
    if (Node.isArrowFunction(initializer)) {
      return this.extractFromComponentLike(initializer, name, filePath);
    }

    // as 표현식 (forwardRef(...) as ...)
    if (Node.isAsExpression(initializer)) {
      return this.extractFromAsExpression(initializer, name, filePath);
    }

    // 함수 표현식
    if (Node.isFunctionExpression(initializer)) {
      return this.extractFromComponentLike(initializer, name, filePath);
    }

    // 함수 호출 (forwardRef, memo 등)
    if (Node.isCallExpression(initializer)) {
      return this.extractFromCallExpression(initializer, name, filePath);
    }

    return null;
  }

  /**
   * VariableDeclaration의 타입에서 React 컴포넌트 props 추출
   * re-export된 외부 컴포넌트 처리용
   */
  private extractFromVariableType(
    node: VariableDeclaration,
    name: string,
    filePath: string,
  ): ComponentInfo | null {
    const type = node.getType();
    const callSignatures = type.getCallSignatures();

    if (callSignatures.length === 0) {
      return null;
    }

    const sig = callSignatures[0];
    const params = sig.getParameters();

    if (params.length === 0) {
      return { name, props: [], filePath };
    }

    const propsParam = params[0];
    const valueDecl = propsParam.getValueDeclaration();

    if (!valueDecl) {
      return { name, props: [], filePath };
    }

    const propsType = propsParam.getTypeAtLocation(valueDecl);
    const props = this.propsExtractor.extractFromType(propsType);

    return { name, props, filePath };
  }

  private extractFromAsExpression(
    node: AsExpression,
    name: string,
    filePath: string,
  ): ComponentInfo | null {
    const expression = node.getExpression();

    if (!Node.isCallExpression(expression)) {
      return null;
    }

    const firstArg = expression.getArguments().at(0);

    if (Node.isArrowFunction(firstArg)) {
      return this.extractFromComponentLike(firstArg, name, filePath);
    }

    if (Node.isFunctionExpression(firstArg)) {
      return this.extractFromComponentLike(firstArg, name, filePath);
    }

    return null;
  }

  private extractFromCallExpression(
    node: CallExpression,
    name: string,
    filePath: string,
  ): ComponentInfo | null {
    const typeArgs = node.getTypeArguments();
    const args = node.getArguments();

    // forwardRef<HTMLDivElement, Props>(...) 형태
    if (typeArgs.length >= 2) {
      const propsType = typeArgs[1].getType();
      let defaultValues = new Map<string, string>();

      // 함수 인자에서 defaultValues 추출
      if (args.length > 0) {
        const firstArg = args[0];

        if (
          Node.isArrowFunction(firstArg) ||
          Node.isFunctionExpression(firstArg)
        ) {
          const parameters = firstArg.getParameters();

          if (parameters.length > 0) {
            defaultValues = this.propsExtractor.extractDefaultValues(
              parameters[0],
            );
          }
        }
      }

      const props = this.propsExtractor.extractFromType(
        propsType,
        defaultValues,
        typeArgs[1],
      );

      if (props.length > 0) {
        return { name, props, filePath };
      }
    }

    // 타입 인자 없이 forwardRef((...) => ...) 형태
    if (args.length > 0) {
      const firstArg = args[0];

      if (Node.isArrowFunction(firstArg)) {
        return this.extractFromComponentLike(firstArg, name, filePath);
      }

      if (Node.isFunctionExpression(firstArg)) {
        return this.extractFromComponentLike(firstArg, name, filePath);
      }
    }

    return null;
  }

  /**
   * 함수형 컴포넌트에서 Props 정보 추출
   */
  private extractFromComponentLike(
    node: FunctionDeclaration | ArrowFunction | FunctionExpression,
    name: string,
    filePath: string,
  ): ComponentInfo {
    const parameters = node.getParameters();

    if (parameters.length === 0) {
      return { name, props: [], filePath };
    }

    const propsParam = parameters[0];
    const propsType = propsParam.getType();
    const defaultValues = this.propsExtractor.extractDefaultValues(propsParam);

    return {
      name,
      props: this.propsExtractor.extractFromType(
        propsType,
        defaultValues,
        propsParam,
      ),
      filePath,
    };
  }

  private collectExportsFromFile(
    sourceFile: SourceFile,
  ): Array<{ node: Node; name: string; filePath: string }> {
    const exportedDeclarations = sourceFile.getExportedDeclarations();
    const filePath = sourceFile.getFilePath();
    const items: Array<{ node: Node; name: string; filePath: string }> = [];

    exportedDeclarations.forEach((declarations, exportName) => {
      for (const declaration of declarations) {
        // 타입 선언은 제외
        if (
          Node.isTypeAliasDeclaration(declaration) ||
          Node.isInterfaceDeclaration(declaration)
        ) {
          continue;
        }

        const isDefaultExport = exportName === 'default';
        const name = isDefaultExport
          ? this.getDefaultExportName(declaration) ?? 'default'
          : exportName;

        items.push({ node: declaration, name, filePath });
      }
    });

    return items;
  }

  private isPascalCase(name: string): boolean {
    return /^[A-Z]/.test(name);
  }

  private getDefaultExportName(node: Node): string | undefined {
    if (Node.isFunctionDeclaration(node)) return node.getName();
    if (Node.isClassDeclaration(node)) return node.getName();
    if (Node.isVariableDeclaration(node)) return node.getName();
    if (Node.isIdentifier(node)) return node.getText();

    return undefined;
  }
}
