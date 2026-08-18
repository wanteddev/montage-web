'use client';
import {
  Box,
  FlexBox,
  Loading,
  ScrollArea,
  Typography,
} from '@montage-ui/core';
import { IconCircleExclamationFill } from '@montage-ui/icon';

import DelayMount from '@/components/delay-mount';
import Editor from '@/features/docs/components/mdx/demo/editor';
import { useReactDemoRunner } from '@/features/docs/components/mdx/demo/hooks';

import Toolbar from './toolbar';
import { useInitialShareState, usePlaygroundControls } from './hooks';
import {
  editorFallbackStyle,
  editorPanelStyle,
  editorStyle,
  errorStyle,
  layoutStyle,
  panelsStyle,
  previewPanelStyle,
  previewViewportStyle,
} from './style';
import { noop } from './helpers';

const Playground = () => {
  const initialState = useInitialShareState();

  const { value, handleValueChange, element, error } = useReactDemoRunner({
    code: initialState.code,
  });

  const { isTransparent, setIsTransparent, handleShare, handleCopy } =
    usePlaygroundControls({ initialState, value, handleValueChange });

  const errorMessage = error?.toString();

  return (
    <FlexBox
      as="main"
      flexDirection="column"
      data-role="playground"
      sx={layoutStyle}
    >
      <Toolbar
        isTransparent={isTransparent}
        onIsTransparentChange={setIsTransparent}
        onShare={handleShare}
        onCopy={handleCopy}
      />

      <FlexBox flexDirection="column" sx={panelsStyle}>
        <FlexBox
          flexDirection="column"
          data-role="playground-editor"
          sx={editorPanelStyle}
        >
          <DelayMount
            delay={300}
            fallback={
              <FlexBox
                alignItems="center"
                justifyContent="center"
                sx={editorFallbackStyle}
              >
                <Loading variant="circular" aria-hidden />

                <Box as="pre" sx={{ height: 0, width: 0, overflow: 'hidden' }}>
                  <code>{value}</code>
                </Box>
              </FlexBox>
            }
          >
            <Box sx={editorStyle}>
              <Editor
                value={value}
                onValueChange={handleValueChange}
                collapsed={false}
                onCollapseChange={noop}
                isResetting={false}
                handleResetComplete={noop}
                sx={{ height: '100%' }}
              />
            </Box>
          </DelayMount>
        </FlexBox>

        <FlexBox
          flexDirection="column"
          data-role="playground-preview"
          sx={previewPanelStyle({ isTransparent })}
        >
          <ScrollArea
            sx={{ flex: '1 1 auto', minHeight: 0 }}
            viewportProps={{ sx: previewViewportStyle }}
          >
            <FlexBox flexDirection="column" sx={{ width: '100%' }}>
              {element}
            </FlexBox>
          </ScrollArea>

          {errorMessage && (
            <FlexBox gap="6px" role="alert" sx={errorStyle}>
              <IconCircleExclamationFill aria-hidden />

              <Typography
                as="pre"
                variant="caption1"
                color="semantic.foreground.negative.primary"
              >
                {errorMessage}
              </Typography>
            </FlexBox>
          )}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default Playground;
