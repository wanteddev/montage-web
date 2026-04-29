'use client';
import { Box, FlexBox, Loading, ScrollArea } from '@wanteddev/wds';

import DelayMount from '@/components/delay-mount';

import {
  demoStyle,
  demoWrapperStyle,
  editorFallbackStyle,
  editorWrapperStyle,
} from './style';
import Editor from './editor';
import { useDemoControls, useReactDemoRunner } from './hooks';
import Toolbar from './toolbar';

type Props = {
  code: string;
  hideCode?: boolean;
  defaultIsTransparent?: boolean;
  previewMaxWidth?: number;
  viewMode?: 'preview' | 'code' | 'both';
  previewBackground?: 'normal' | 'alternative';
  embedded?: boolean;
};

const Demo = ({
  code,
  hideCode,
  defaultIsTransparent,
  previewMaxWidth,
  viewMode = 'both',
  previewBackground,
  embedded,
}: Props) => {
  const showPreview = viewMode !== 'code';
  const showCode = !hideCode && viewMode !== 'preview';

  const { value, handleValueChange, element, error } = useReactDemoRunner({
    code,
  });

  const {
    isTransparent,
    setIsTransparent,
    collapsed,
    setCollapsed,
    isResetting,
    handleCopy,
    handleReset,
    handleResetComplete,
  } = useDemoControls({
    initialValue: code,
    value,
    handleValueChange,
    defaultIsTransparent,
  });

  return (
    <FlexBox
      flexDirection="column"
      data-role="demo"
      style={
        {
          ['--demo-editor-height']: collapsed
            ? '250px'
            : 'clamp(300px, 60dvh, 960px)',
        } as React.CSSProperties
      }
      sx={demoWrapperStyle({ embedded })}
    >
      {showPreview && (
        <ScrollArea
          scrollbars="horizontal"
          sx={{
            ...(!showCode ? { borderRadius: 'inherit' } : {}),
            ...(previewMaxWidth != null
              ? {
                  maxWidth: `${previewMaxWidth}px`,
                  margin: '0 auto',
                  transition: 'max-width 240ms ease',
                }
              : {}),
          }}
          data-role="demo-viewport"
          viewportProps={{
            sx: demoStyle({
              hideCode: !showCode,
              isTransparent,
              previewBackground,
              embedded,
            }),
          }}
        >
          <FlexBox alignItems="center" flexDirection="column">
            {element}
          </FlexBox>
        </ScrollArea>
      )}

      {showCode && (
        <FlexBox flexDirection="column">
          <Toolbar
            errorMessage={error?.toString()}
            onCopy={handleCopy}
            onReset={handleReset}
            isTransparent={isTransparent}
            onIsTransparentChange={setIsTransparent}
            collapsed={collapsed}
            onCollapseChange={setCollapsed}
          />

          <FlexBox
            flexDirection="column"
            sx={editorWrapperStyle({ hasError: Boolean(error), embedded })}
          >
            <DelayMount
              delay={300}
              fallback={
                <FlexBox
                  alignItems="center"
                  justifyContent="center"
                  sx={editorFallbackStyle({ embedded })}
                >
                  <Loading variant="circular" aria-hidden />
                  <Box
                    as="pre"
                    sx={{ height: 0, width: 0, overflow: 'hidden' }}
                  >
                    <code>{value}</code>
                  </Box>
                </FlexBox>
              }
            >
              <Editor
                value={value}
                onValueChange={handleValueChange}
                collapsed={collapsed}
                onCollapseChange={setCollapsed}
                isResetting={isResetting}
                handleResetComplete={handleResetComplete}
              />
            </DelayMount>
          </FlexBox>
        </FlexBox>
      )}
    </FlexBox>
  );
};

export default Demo;
