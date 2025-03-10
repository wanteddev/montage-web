'use client';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { forwardRef, useCallback, useId } from 'react';
import {
  IconCircleCheckFill,
  IconCircleExclamationFill,
  IconCircleInfoFill,
  IconClose,
  IconTriangleExclamationFill,
} from '@wanteddev/wds-icon';
import { Box } from '@wanteddev/wds-engine';

import Typography from '../typography';
import FlexBox from '../flex-box';
import IconButton from '../icon-button';

import {
  firstOverlayStyle,
  secondOverlayStyle,
  sectionMessageCloseIconStyle,
  sectionMessageIconStyle,
  sectionMessageTrailingContentStyle,
  sectionMessageWrapperStyle,
} from './style';

import type { ReactNode } from 'react';
import type { SectionMessageProps } from './types';
import type { DefaultComponentProps } from '@wanteddev/wds-engine';

const SectionMessage = forwardRef<
  HTMLDivElement,
  DefaultComponentProps<SectionMessageProps, 'div'>
>(
  (
    {
      show: originShow,
      defaultShow = true,
      onShowChange,
      variant = 'info',
      children,
      leadingContent,
      trailingContent,
      caption,
      actionArea,
      closeIcon = false,
      ...props
    },
    ref,
  ) => {
    const [show = false, setShow] = useControllableState({
      prop: originShow,
      defaultProp: defaultShow,
      onChange: onShowChange,
    });

    const handleShowToggle = useCallback(
      () => setShow((prevShow) => !prevShow),
      [setShow],
    );

    const descriptionId = useId();

    const iconComponent: {
      [key in Exclude<SectionMessageProps['variant'], undefined>]: ReactNode;
    } = {
      custom: null,
      positive: <IconCircleCheckFill aria-label="positive" role="img" />,
      negative: <IconCircleExclamationFill aria-label="negative" role="img" />,
      cautionary: (
        <IconTriangleExclamationFill aria-label="cautionary" role="img" />
      ),
      info: <IconCircleInfoFill aria-label="info" role="img" />,
    };

    const renderLeadingContent = leadingContent ?? iconComponent[variant];

    return (
      <>
        {show && (
          <FlexBox
            ref={ref}
            gap="12px"
            role="alert"
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
                color="palette.label.normal"
                variant="body1"
                weight="medium"
                data-role="section-message-content-title"
                id={descriptionId}
                as="h2"
              >
                {children}
              </Typography>

              {caption && (
                <Typography
                  variant="body2"
                  weight="regular"
                  data-role="section-message-content-caption"
                  color="palette.label.neutral"
                  as="p"
                >
                  {caption}
                </Typography>
              )}

              {actionArea && (
                <FlexBox
                  data-role="section-message-action-area"
                  sx={{ marginTop: 8 }}
                  gap="16px"
                >
                  {actionArea}
                </FlexBox>
              )}
            </FlexBox>

            {trailingContent && (
              <FlexBox
                gap="16px"
                alignItems="center"
                sx={sectionMessageTrailingContentStyle}
                data-role="section-message-trailing-content"
              >
                {trailingContent}
              </FlexBox>
            )}

            {closeIcon && (
              <IconButton
                data-role="section-message-close-icon"
                color="palette.label.alternative"
                interactionColor="palette.label.alternative"
                onClick={handleShowToggle}
                size={20}
                sx={sectionMessageCloseIconStyle}
              >
                <IconClose />
              </IconButton>
            )}
          </FlexBox>
        )}
      </>
    );
  },
);

SectionMessage.displayName = 'SectionMessage';

export default SectionMessage;
