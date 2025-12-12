import { Node } from 'ts-morph';

import { Resolver } from './resolver';

import type { BindingElement, ParameterDeclaration, Type } from 'ts-morph';
import type { Prop } from './types';

/**
 * React 컴포넌트의 Props 정보를 추출하는 클래스
 */
export class Extractor {
  private resolver: Resolver;

  /** 반응형 breakpoint prop 이름들 */
  private readonly responsivePropNames = ['xs', 'sm', 'md', 'lg', 'xl'];

  constructor() {
    this.resolver = new Resolver();
  }

  /**
   * Props 타입에서 각 prop 정보 추출
   */
  public extractFromType(
    type: Type,
    defaultValues: Map<string, string> = new Map(),
    contextNode?: Node,
  ): Array<Prop> {
    const props: Array<Prop> = [];
    const properties = type.getProperties();

    for (const prop of properties) {
      const propName = prop.getName();

      if (this.shouldSkipProp(propName, prop)) {
        continue;
      }

      const valueDeclaration =
        prop.getValueDeclaration() ?? prop.getDeclarations()[0];

      const propType = this.getPropType(prop, valueDeclaration, contextNode);

      if (!propType) {
        continue;
      }

      const resolvedType = this.resolvePropertyType(
        propName,
        propType,
        valueDeclaration,
      );

      const propInfo: Prop = {
        name: propName,
        type: resolvedType,
        isOptional: prop.isOptional(),
      };

      // JSDoc 주석에서 description 추출
      const description = this.getDescription(valueDeclaration);

      if (description) {
        propInfo.description = description;
      }

      const defaultValue = defaultValues.get(propName);

      if (defaultValue !== undefined) {
        propInfo.defaultValue = defaultValue;
      }

      props.push(propInfo);
    }

    return props;
  }

  /**
   * 파라미터의 destructuring pattern에서 default values 추출
   */
  public extractDefaultValues(
    param: ParameterDeclaration,
  ): Map<string, string> {
    const defaultValues = new Map<string, string>();
    const nameNode = param.getNameNode();

    if (!Node.isObjectBindingPattern(nameNode)) {
      return defaultValues;
    }

    for (const element of nameNode.getElements()) {
      const defaultValue = this.extractDefaultValueFromElement(element);

      if (defaultValue !== null) {
        const propName =
          element.getPropertyNameNode()?.getText() ?? element.getName();
        defaultValues.set(propName, defaultValue);
      }
    }

    return defaultValues;
  }

  private shouldSkipProp(
    propName: string,
    prop: ReturnType<Type['getProperties']>[number],
  ): boolean {
    // key, ref는 제외
    if (propName === 'key' || propName === 'ref') {
      return true;
    }

    // React 타입에서 오는 prop은 제외
    return this.isFromReactTypes(prop);
  }

  private getPropType(
    prop: ReturnType<Type['getProperties']>[number],
    valueDeclaration: Node | undefined,
    contextNode?: Node,
  ): Type | null {
    if (valueDeclaration) {
      return prop.getTypeAtLocation(valueDeclaration);
    }

    if (contextNode) {
      return prop.getTypeAtLocation(contextNode);
    }

    return null;
  }

  private resolvePropertyType(
    propName: string,
    propType: Type,
    valueDeclaration?: Node,
  ): string {
    // 타입 annotation에서 원래 타입 텍스트 확인
    const typeAnnotationText = this.getTypeAnnotationText(valueDeclaration);

    if (typeAnnotationText) {
      // preserved type이면 그대로 사용
      if (this.resolver.isPreservedType(typeAnnotationText)) {
        return typeAnnotationText;
      }

      // 복잡한 타입 annotation이면 그대로 사용
      if (this.isComplexTypeAnnotation(typeAnnotationText)) {
        return typeAnnotationText;
      }
    }

    // 반응형 prop은 cleanTypeText 사용
    if (this.responsivePropNames.includes(propName)) {
      return this.resolver.cleanTypeText(propType.getText());
    }

    return this.resolver.resolve(propType);
  }

  /**
   * valueDeclaration에서 JSDoc 주석의 description 추출
   */
  private getDescription(declaration?: Node): string | null {
    if (!declaration) {
      return null;
    }

    let rawDescription: string | null = null;

    // PropertySignature에서 JSDoc 추출
    if (Node.isPropertySignature(declaration)) {
      const jsDocs = declaration.getJsDocs();

      if (jsDocs.length > 0) {
        rawDescription = jsDocs[0].getDescription();
      }
    }

    // PropertyDeclaration에서 JSDoc 추출
    if (Node.isPropertyDeclaration(declaration)) {
      const jsDocs = declaration.getJsDocs();

      if (jsDocs.length > 0) {
        rawDescription = jsDocs[0].getDescription();
      }
    }

    if (!rawDescription) {
      return null;
    }

    // JSDoc 마커 및 불필요한 공백 제거
    const cleaned = this.cleanDescription(rawDescription);

    return cleaned || null;
  }

  /**
   * JSDoc description 텍스트 정리
   */
  private cleanDescription(text: string): string {
    return (
      text
        // JSDoc 마커 제거 (어디에 있든)
        .replace(/\/\*\*\s*/g, '')
        .replace(/\s*\*\//g, '')
        // 각 줄 앞의 * 제거
        .replace(/^\s*\*\s?/gm, '')
        .replace(/\n+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    );
  }

  /**
   * valueDeclaration에서 타입 annotation 텍스트 추출
   * TypeScript가 resolve하기 전의 원래 타입을 가져옴
   */
  private getTypeAnnotationText(declaration?: Node): string | null {
    if (!declaration) {
      return null;
    }

    let rawText: string | null = null;

    // PropertySignature: interface의 property
    if (Node.isPropertySignature(declaration)) {
      const typeNode = declaration.getTypeNode();

      if (typeNode) {
        rawText = typeNode.getText();
      }
    }

    // PropertyDeclaration: class의 property
    if (Node.isPropertyDeclaration(declaration)) {
      const typeNode = declaration.getTypeNode();

      if (typeNode) {
        rawText = typeNode.getText();
      }
    }

    if (!rawText) {
      return null;
    }

    // 줄바꿈과 여러 공백을 정리
    return this.cleanTypeText(rawText);
  }

  /**
   * 타입 텍스트에서 불필요한 줄바꿈과 공백 제거
   */
  private cleanTypeText(text: string): string {
    return text
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/< /g, '<')
      .replace(/ >/g, '>')
      .trim();
  }

  /**
   * 복잡한 타입 annotation인지 확인
   * Generic 타입이나 utility 타입 조합
   */
  private isComplexTypeAnnotation(text: string): boolean {
    const utilityTypes = ['ComponentPropsWithoutRef', 'ComponentProps'];

    return utilityTypes.some((t) => text.includes(`${t}<`));
  }

  private isFromReactTypes(
    prop: ReturnType<Type['getProperties']>[number],
  ): boolean {
    const declarations = prop.getDeclarations();

    if (declarations.length === 0) {
      return true;
    }

    for (const declaration of declarations) {
      const filePath = declaration.getSourceFile().getFilePath();

      if (!filePath.includes('node_modules')) {
        return false;
      }

      if (
        !filePath.includes('@types/react') &&
        !filePath.includes('node_modules/react/')
      ) {
        return false;
      }
    }

    return true;
  }

  private extractDefaultValueFromElement(
    element: BindingElement,
  ): string | null {
    const initializer = element.getInitializer();

    if (!initializer) {
      return null;
    }

    if (Node.isStringLiteral(initializer)) {
      return `"${initializer.getLiteralValue()}"`;
    }

    if (Node.isNumericLiteral(initializer)) {
      return initializer.getLiteralText();
    }

    if (Node.isTrueLiteral(initializer)) {
      return 'true';
    }

    if (Node.isFalseLiteral(initializer)) {
      return 'false';
    }

    if (Node.isNullLiteral(initializer)) {
      return 'null';
    }

    if (
      Node.isIdentifier(initializer) &&
      initializer.getText() === 'undefined'
    ) {
      return 'undefined';
    }

    if (Node.isArrayLiteralExpression(initializer)) {
      return initializer.getText();
    }

    if (Node.isObjectLiteralExpression(initializer)) {
      return initializer.getText();
    }

    return initializer.getText();
  }
}
