import type { Rule } from 'eslint';
import type { ImportDeclaration, Node } from 'estree';
import type { JSXOpeningElement } from 'estree-jsx';

type WdsComponentName = {
  componentName: string;
  namespaceName: string | null;
};

export class WdsImportParser {
  private wdsImport: Array<{ local: string; source: string }> = [];
  private wdsImportNamespace: Array<string> = [];

  public saveImportDeclaration(
    node: ImportDeclaration & Rule.NodeParentExtension,
  ) {
    if (node.source.value === '@wanteddev/wds') {
      node.specifiers.forEach((specifier) => {
        if (specifier.type === 'ImportSpecifier') {
          this.wdsImport.push({
            local: specifier.local.name,
            source:
              specifier.imported.type === 'Identifier'
                ? specifier.imported.name
                : specifier.imported.value?.toString() ?? '',
          });
        } else if (specifier.type === 'ImportNamespaceSpecifier') {
          this.wdsImportNamespace.push(specifier.local.name);
        }
      });
    }
  }

  public getComponentName(node: Node) {
    const openingElement = node as JSXOpeningElement;
    const namespaceName =
      openingElement.name.type === 'JSXMemberExpression' &&
      openingElement.name.object.type === 'JSXIdentifier'
        ? openingElement.name.object.name
        : null;

    const componentName =
      openingElement.name.type === 'JSXIdentifier'
        ? openingElement.name.name
        : openingElement.name.type === 'JSXMemberExpression'
          ? openingElement.name.property.name
          : '';

    return {
      componentName,
      namespaceName,
    } satisfies WdsComponentName;
  }

  public isWdsComponent({ componentName, namespaceName }: WdsComponentName) {
    if (namespaceName) {
      return this.wdsImportNamespace.includes(namespaceName);
    }

    return this.wdsImport.some(
      (wdsImport) => wdsImport.local === componentName,
    );
  }

  public resolveImportedName({
    componentName,
    namespaceName,
  }: WdsComponentName) {
    if (namespaceName) {
      return componentName;
    }

    return this.wdsImport.find((wdsImport) => wdsImport.local === componentName)
      ?.source;
  }
}
