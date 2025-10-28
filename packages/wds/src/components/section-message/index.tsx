import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { forwardRef, useCallback, useId } from 'react';
import {
  IconCircleCheckFill,
  IconCircleCloseFill,
  IconCircleInfoFill,
  IconClose,
  IconTriangleExclamationFill,
} from '@wanteddev/wds-icon';
import { Box } from '@wanteddev/wds-engine';

import { Typography } from '../typography';
import { FlexBox } from '../flex-box';
import { IconButton } from '../icon-button';

import {
  firstOverlayStyle,
  secondOverlayStyle,
  sectionMessageCloseButtonStyle,
  sectionMessageIconStyle,
  sectionMessageTrailingButtonStyle,
  sectionMessageWrapperStyle,
} from './style';

import type { ReactNode } from 'react';
import type { SectionMessageProps } from './types';
import type { DefaultComponentPropsInternal } from '@wanteddev/wds-engine';

const SectionMessage = forwardRef<
  HTMLDivElement,
  DefaultComponentPropsInternal<SectionMessageProps, 'div'>
>(
  (
    {
      open: originOpen,
      defaultOpen,
      onOpenChange,
      variant = 'info',
      children,
      leadingContent,
      trailingButton,
      description,
      bottomButton,
      closeButton = false,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useControllableState({
      prop: originOpen,
      defaultProp: defaultOpen ?? true,
      onChange: onOpenChange,
    });

    const handleClose = useCallback(() => setOpen(false), [setOpen]);

    const titleId = useId();
    const descriptionId = useId();

    const iconComponent: {
      [key in Exclude<SectionMessageProps['variant'], undefined>]: ReactNode;
    } = {
      custom: null,
      positive: <IconCircleCheckFill aria-label="positive" role="img" />,
      negative: <IconCircleCloseFill aria-label="negative" role="img" />,
      cautionary: (
        <IconTriangleExclamationFill aria-label="cautionary" role="img" />
      ),
      info: <IconCircleInfoFill aria-label="info" role="img" />,
    };

    const renderLeadingContent = leadingContent ?? iconComponent[variant];

    if (!open) return null;

    return (
      <FlexBox
        ref={ref}
        gap="8px"
        role="alert"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        {...props}
        sx={[sectionMessageWrapperStyle, props.sx]}
      >
        <Box role="presentation" sx={firstOverlayStyle} />
        <Box role="presentation" sx={secondOverlayStyle(variant)} />

        {renderLeadingContent && (
          <FlexBox flexShrink={0} sx={sectionMessageIconStyle(variant)}>
            {renderLeadingContent}
          </FlexBox>
        )}

        <FlexBox
          data-role="section-message-content"
          flexDirection="column"
          gap="4px"
          flex="1"
        >
          <Typography
            color="semantic.label.normal"
            variant="body2"
            weight="medium"
            data-role="section-message-content-title"
            id={titleId}
            as="h2"
          >
            {children}
          </Typography>

          {description && (
            <Typography
              variant="label1-reading"
              weight="regular"
              data-role="section-message-content-description"
              id={descriptionId}
              color="semantic.label.neutral"
              as="p"
            >
              {description}
            </Typography>
          )}

          {bottomButton && (
            <FlexBox
              data-role="section-message-bottom-button"
              sx={{ marginTop: 8 }}
              gap="16px"
            >
              {bottomButton}
            </FlexBox>
          )}
        </FlexBox>

        {trailingButton && (
          <FlexBox
            gap="16px"
            alignItems="center"
            sx={sectionMessageTrailingButtonStyle}
            data-role="section-message-trailing-button"
          >
            {trailingButton}
          </FlexBox>
        )}

        {closeButton && (
          <IconButton
            data-role="section-message-close-icon"
            color="semantic.label.alternative"
            interactionColor="semantic.label.alternative"
            onClick={handleClose}
            size={20}
            aria-label="Close message"
            sx={sectionMessageCloseButtonStyle}
          >
            <IconClose />
          </IconButton>
        )}
      </FlexBox>
    );
  },
);

SectionMessage.displayName = 'SectionMessage';

export { SectionMessage };

export type { SectionMessageProps };
