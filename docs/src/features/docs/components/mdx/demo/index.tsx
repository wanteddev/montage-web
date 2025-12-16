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
};

const Demo = ({ code, hideCode, defaultIsTransparent }: Props) => {
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
      sx={demoWrapperStyle}
    >
      <ScrollArea
        scrollbars="horizontal"
        sx={hideCode && { borderRadius: 'inherit' }}
        data-role="demo-viewport"
        viewportProps={{
          sx: demoStyle({ hideCode, isTransparent }),
        }}
      >
        <FlexBox alignItems="center" flexDirection="column">
          {element}
        </FlexBox>
      </ScrollArea>

      {!hideCode && (
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
            sx={editorWrapperStyle({ hasError: Boolean(error) })}
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
