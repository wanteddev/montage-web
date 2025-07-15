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
      show: originShow,
      defaultShow = true,
      onShowChange,
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
      negative: <IconCircleCloseFill aria-label="negative" role="img" />,
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
            gap="8px"
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
                color="semantic.label.normal"
                variant="body2"
                weight="medium"
                data-role="section-message-content-title"
                id={descriptionId}
                as="h2"
              >
                {children}
              </Typography>

              {description && (
                <Typography
                  variant="label1-reading"
                  weight="regular"
                  data-role="section-message-content-description"
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
                onClick={handleShowToggle}
                size={20}
                sx={sectionMessageCloseButtonStyle}
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

export { SectionMessage };

export type { SectionMessageProps };
