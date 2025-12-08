import type { Type } from 'ts-morph';

export class Resolver {
  private readonly preservedTypeNames = new Set([
    'ReactNode',
    'ReactElement',
    'ReactFragment',
    'ReactPortal',
    'JSX.Element',
    'CSSProperties',
    'RefObject',
    'MutableRefObject',
    'Ref',
    'ForwardedRef',
    'CSSInterpolation',
    'SxProp',
    'ThemeColorsToken',
  ]);

  /**
   * 보존할 타입 이름인지 확인
   */
  public isPreservedType(name: string): boolean {
    return this.preservedTypeNames.has(name);
  }

  /**
   * 타입을 문자열로 변환
   */
  public resolve(type: Type, depth = 0): string {
    if (depth > 2) {
      return this.cleanTypeText(type.getText());
    }

    const preservedName = this.getPreservedTypeName(type);

    if (preservedName) {
      return preservedName;
    }

    const value =
      this.resolvePrimitive(type) ??
      this.resolveUnion(type, depth) ??
      this.resolveIntersection(type, depth) ??
      this.resolveArray(type, depth) ??
      this.resolveTuple(type, depth) ??
      this.resolveFunction(type, depth) ??
      this.resolveObject(type, depth) ??
      this.resolveAlias(type, depth) ??
      this.resolveSymbol(type, depth) ??
      this.cleanTypeText(type.getText());

    return value;
  }

  /**
   * 타입 텍스트에서 import 경로 제거
   */
  public cleanTypeText(text: string): string {
    return text.replace(/import\("[^"]+"\)\./g, '');
  }

  private getPreservedTypeName(type: Type): string | null {
    const aliasSymbol = type.getAliasSymbol();

    if (aliasSymbol) {
      const name = aliasSymbol.getName();

      if (this.preservedTypeNames.has(name)) {
        return name;
      }

      if (name === 'T') {
        return 'ElementType';
      }
    }

    const symbol = type.getSymbol();

    if (symbol) {
      const name = symbol.getName();

      if (this.preservedTypeNames.has(name)) {
        return name;
      }

      if (name === 'T') {
        return 'ElementType';
      }
    }

    const cssTypeName = type.getText().includes('csstype')
      ? this.cleanTypeText(type.getText())
      : null;

    if (cssTypeName) {
      return cssTypeName;
    }

    return null;
  }

  private resolvePrimitive(type: Type): string | null {
    if (type.isUndefined()) return 'undefined';
    if (type.isNull()) return 'null';
    if (type.isBooleanLiteral()) return type.getText();
    if (type.isBoolean()) return 'boolean';
    if (type.isStringLiteral()) return `"${type.getLiteralValue()}"`;
    if (type.isString()) return 'string';
    if (type.isNumberLiteral()) return String(type.getLiteralValue());
    if (type.isNumber()) return 'number';
    if (type.getText() === 'void') return 'void';
    if (type.isNever()) return 'never';
    if (type.isAny()) return 'any';
    if (type.isUnknown()) return 'unknown';

    return null;
  }

  private resolveUnion(type: Type, depth: number): string | null {
    if (!type.isUnion()) return null;

    const unionTypes = type.getUnionTypes();
    const resolvedTypes = unionTypes
      .map((t) => this.resolve(t, depth + 1))
      .filter((t) => t !== 'undefined');

    // true | false -> boolean
    if (
      resolvedTypes.length === 2 &&
      resolvedTypes.every((t) => ['true', 'false'].includes(t))
    ) {
      return 'boolean';
    }

    return resolvedTypes.join(' | ');
  }

  private resolveIntersection(type: Type, depth: number): string | null {
    if (!type.isIntersection()) return null;

    const intersectionTypes = type.getIntersectionTypes();
    const resolvedTypes = intersectionTypes.map((t) =>
      this.resolve(t, depth + 1),
    );

    return resolvedTypes.join(' & ');
  }

  private resolveArray(type: Type, depth: number): string | null {
    if (!type.isArray()) return null;

    const elementType = type.getArrayElementType();

    if (!elementType) return null;

    const resolved = this.resolve(elementType, depth + 1);

    // Union이나 복잡한 타입이면 Array<T> 형태 사용
    if (resolved.includes(' | ') || resolved.includes(' & ')) {
      return `Array<${resolved}>`;
    }

    return `${resolved}[]`;
  }

  private resolveTuple(type: Type, depth: number): string | null {
    if (!type.isTuple()) return null;

    const tupleElements = type.getTupleElements();
    const resolvedElements = tupleElements.map((t) =>
      this.resolve(t, depth + 1),
    );

    return `[${resolvedElements.join(', ')}]`;
  }

  private resolveFunction(type: Type, depth: number): string | null {
    const callSignatures = type.getCallSignatures();

    if (callSignatures.length === 0) return null;

    const sig = callSignatures[0];
    const params = sig.getParameters().map((p) => {
      const valueDecl = p.getValueDeclaration();

      if (!valueDecl) {
        return `${p.getName()}: unknown`;
      }

      const paramType = p.getTypeAtLocation(valueDecl);

      return `${p.getName()}: ${this.resolve(paramType, depth + 1)}`;
    });

    const returnType = this.resolve(sig.getReturnType(), depth + 1);

    return `(${params.join(', ')}) => ${returnType}`;
  }

  private resolveObject(type: Type, depth: number): string | null {
    if (!type.isObject() || type.isArray() || type.isTuple()) return null;

    const properties = type.getProperties();

    // 프로퍼티가 있고 10개 이하인 객체
    if (properties.length > 0 && properties.length <= 10) {
      const propStrings: Array<string | null> = properties.map((prop) => {
        const valueDecl =
          prop.getValueDeclaration() ?? prop.getDeclarations()[0];

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!valueDecl) {
          return null;
        }

        const propType = prop.getTypeAtLocation(valueDecl);
        const isOptional = prop.isOptional();
        const optionalMark = isOptional ? '?' : '';

        return `${prop.getName()}${optionalMark}: ${this.resolve(propType, depth + 1)}`;
      });

      // null이 포함되면 타입 텍스트 그대로 사용
      if (propStrings.includes(null)) {
        return this.cleanTypeText(type.getText());
      }

      return `{ ${propStrings.join('; ')} }`;
    }

    // 심볼 이름 사용
    const symbol = type.getSymbol() ?? type.getAliasSymbol();

    if (symbol) {
      return symbol.getName();
    }

    return null;
  }

  private resolveAlias(type: Type, depth: number): string | null {
    const aliasSymbol = type.getAliasSymbol();

    if (!aliasSymbol) return null;

    const typeArgs = type.getAliasTypeArguments();

    if (typeArgs.length > 0) {
      const resolvedArgs = typeArgs.map((t) => this.resolve(t, depth + 1));
      return `${aliasSymbol.getName()}<${resolvedArgs.join(', ')}>`;
    }

    return aliasSymbol.getName();
  }

  private resolveSymbol(type: Type, depth: number): string | null {
    const symbol = type.getSymbol();

    if (!symbol) return null;

    const typeArgs = type.getTypeArguments();

    if (typeArgs.length > 0) {
      const resolvedArgs = typeArgs.map((t) => this.resolve(t, depth + 1));
      return `${symbol.getName()}<${resolvedArgs.join(', ')}>`;
    }

    return symbol.getName();
  }
}
