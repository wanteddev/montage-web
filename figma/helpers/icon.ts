import figma from 'figma';

type InstanceHandle = ReturnType<typeof figma.selectedInstance.findInstance>;

/**
 * Renders a (swapped) icon instance as its `@montage-ui/icon` component and
 * returns the import statement explicitly, because Code Connect forwards
 * imports only one nesting level up.
 *
 * Icons resolved through our own Code Connect (the icon batch exposes
 * `metadata.props.imports`) are used as-is. Library (remote) icons have no
 * mapping in this file (or only their v1 one), so the component is derived from the icon's `Name`
 * variant: `Icon` + PascalCase(Name) (e.g. `chevronDownThickSmall` →
 * `IconChevronDownThickSmall`), matching the icon generator.
 */
export const renderIcon = (
  icon: InstanceHandle | undefined,
): { code: unknown; imports: Array<string> } | undefined => {
  if (!icon || icon.type === 'ERROR') {
    return undefined;
  }

  if (icon.hasCodeConnect()) {
    const { example, metadata } = icon.executeTemplate();
    const imports = metadata?.props?.imports as Array<string> | undefined;
    // Our icon templates always expose `metadata.props.imports`. A mapping
    // without it is a library (remote) icon still carrying its v1 Code Connect
    // (`@wanteddev/*`), so fall back to the `Name`-derived component below.
    if (imports) {
      return { code: example, imports };
    }
  }

  const name = String(icon.getPropertyValue('Name') ?? '').trim();
  if (!name || name === 'Null') {
    return undefined;
  }
  const component = `Icon${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  return {
    code: figma.tsx`<${component} />`,
    imports: [`import { ${component} } from '@montage-ui/icon';`],
  };
};
