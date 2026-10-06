import type figma from 'figma';

type InstanceHandle = ReturnType<typeof figma.selectedInstance.findInstance>;

/**
 * Builds `PushBadge` props from a `Push Badge/Push Badge` instance.
 * Defaults (`variant="dot"`, `size="xsmall"`) are omitted, as in the docs.
 */
export const pushBadgeProps = (badge: InstanceHandle) => {
  if (badge.type === 'ERROR') {
    return '';
  }

  const variant = badge.getPropertyValue('Variant');
  const size = badge.getEnum('Size', {
    XSmall: undefined,
    Small: 'small',
    Medium: 'medium',
  });
  const outlineBorder = badge.getBoolean('Outline Border') === true;

  let variantProps = '';
  if (variant === 'Text') {
    variantProps = ` variant="text" text=${JSON.stringify(
      badge.getString('Text'),
    )}`;
  } else if (variant === 'Max Count') {
    // Figma shows the capped label ("99+"); the default `maxCount` is 99.
    variantProps = ' variant="max-count" text={100}';
  }

  return (
    variantProps +
    (size ? ` size="${size}"` : '') +
    (outlineBorder ? ' outlineBorder' : '')
  );
};

/** Wraps already rendered code with a `PushBadge` built from `badge`. */
export const wrapWithPushBadge = (badge: InstanceHandle, code: string) =>
  `<PushBadge${pushBadgeProps(badge)}>
  ${code.split('\n').join('\n  ')}
</PushBadge>`;
