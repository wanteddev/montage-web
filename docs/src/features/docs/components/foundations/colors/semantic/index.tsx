'use client';
import { FlexBox, Typography, useTheme } from '@montage-ui/core';
import { capitalCase } from 'change-case';

import { Heading2 } from '@/features/docs/components/mdx/section/layout';

import { Palette, PaletteItem } from '../palette';

const FoundationsColorsSemantic = () => {
  const theme = useTheme();

  const renderPalette = <T extends object>(object: T, group: string) => {
    return (
      <Palette sx={{ marginTop: '20px' }}>
        {Object.keys(object)
          .sort((a, b) => Number(b) - Number(a))
          .map((color) => (
            <FlexBox flexDirection="column" gap="4px" key={color}>
              <PaletteItem
                group={group}
                token={color}
                tokenPrefix="color-semantic"
                color={object[color as keyof T] as string}
              />
              <Typography
                variant="caption2"
                weight="bold"
                color="semantic.foreground.neutral.tertiary"
                as="p"
                align="left"
                sx={{ '&&': { maxWidth: 'unset' } }}
              >
                {capitalCase(color)}
              </Typography>
            </FlexBox>
          ))}
      </Palette>
    );
  };

  return (
    <>
      <Heading2
        content="Foreground - Neutral"
        sx={{ '&&:first-of-type': { marginTop: '0px' } }}
      />

      <p>
        텍스트, 아이콘 등 전경 요소에 사용하는 기본 색상입니다. Primary,
        Secondary, Tertiary, Quaternary 순으로 정보의 위계를 표현하며, Strong은
        가장 높은 대비가 필요할 때, Inverse는 반전된 배경 위에서 사용합니다.
      </p>

      {renderPalette(theme.semantic.foreground.neutral, 'foreground-neutral')}

      <Heading2 content="Foreground - Brand" sx={{ marginTop: '120px' }} />

      <p>
        브랜드 컬러를 텍스트, 아이콘 등 전경 요소에 사용할 때 활용합니다.
        Inverse는 반전된 배경 위에서 브랜드 컬러를 표현할 때 사용합니다.
      </p>

      {renderPalette(theme.semantic.foreground.brand, 'foreground-brand')}

      <Heading2 content="Foreground - Positive" sx={{ marginTop: '120px' }} />

      <p>긍정적인 상태를 전경 요소로 표현할 때 사용합니다.</p>

      {renderPalette(theme.semantic.foreground.positive, 'foreground-positive')}

      <Heading2 content="Foreground - Cautionary" sx={{ marginTop: '120px' }} />

      <p>주의가 필요한 상태를 전경 요소로 표현할 때 사용합니다.</p>

      {renderPalette(
        theme.semantic.foreground.cautionary,
        'foreground-cautionary',
      )}

      <Heading2 content="Foreground - Negative" sx={{ marginTop: '120px' }} />

      <p>
        부정적인 상태나 오류를 전경 요소로 표현할 때 사용합니다. 더 강한 대비가
        필요한 경우 Strong을 사용합니다.
      </p>

      {renderPalette(theme.semantic.foreground.negative, 'foreground-negative')}

      <Heading2 content="Foreground - Disable" sx={{ marginTop: '120px' }} />

      <p>상호작용이 불가능한 비활성 상태의 전경 요소에 사용합니다.</p>

      {renderPalette(theme.semantic.foreground.disable, 'foreground-disable')}

      <Heading2 content="Foreground - Inactive" sx={{ marginTop: '120px' }} />

      <p>
        상호작용 요소에서 선택되지 않았거나 활성화되지 않은 상태를 표현할 때
        사용합니다.
      </p>

      {renderPalette(theme.semantic.foreground.inactive, 'foreground-inactive')}

      <Heading2 content="Foreground - Accent" sx={{ marginTop: '120px' }} />

      <p>
        시각적 대비를 명확하게 유지하기 위해 앞쪽 요소에 사용하는 색상입니다.
      </p>

      {renderPalette(theme.semantic.foreground.accent, 'foreground-accent')}

      <Heading2 content="Background - Neutral" sx={{ marginTop: '120px' }} />

      <p>
        일반적인 화면의 배경 색상으로 활용합니다. 카드 UI와 같이 어떠한 요소와
        배경의 구분을 분명히 둬야할 때 Secondary를 사용하여 대비를 줍니다.
      </p>

      {renderPalette(theme.semantic.background.neutral, 'background-neutral')}

      <Heading2 content="Surface - Neutral" sx={{ marginTop: '120px' }} />

      <p>
        패널과 같이 어떠한 요소에서 표면 색상이 필요한 경우 사용합니다. 투명도가
        포함된 Secondary, Tertiary, Strong으로 배경과의 구분 정도를 조절하며,
        Inverse는 반전된 표면을 표현할 때 사용합니다.
      </p>

      {renderPalette(theme.semantic.surface.neutral, 'surface-neutral')}

      <Heading2 content="Surface - Elevated" sx={{ marginTop: '120px' }} />

      <p>
        모달과 같이 층위가 있는 화면에서 사용하는 표면 색상으로 다크 모드에서
        Background - Neutral과의 색상 차이가 있습니다.
      </p>

      {renderPalette(theme.semantic.surface.elevated, 'surface-elevated')}

      <Heading2 content="Surface - Brand" sx={{ marginTop: '120px' }} />

      <p>
        화면 내에서 가장 중요한 요소를 표현할 때 사용하는 브랜드 표면
        색상입니다. Primary, Strong, Heavy를 상황에 맞게 적절히 선택하여
        사용하며, Subtle은 옅은 브랜드 배경이 필요할 때 사용합니다.
      </p>

      {renderPalette(theme.semantic.surface.brand, 'surface-brand')}

      <Heading2 content="Surface - Positive" sx={{ marginTop: '120px' }} />

      <p>긍정적인 상태를 배경으로 표현할 때 사용합니다.</p>

      {renderPalette(theme.semantic.surface.positive, 'surface-positive')}

      <Heading2 content="Surface - Cautionary" sx={{ marginTop: '120px' }} />

      <p>주의가 필요한 상태를 배경으로 표현할 때 사용합니다.</p>

      {renderPalette(theme.semantic.surface.cautionary, 'surface-cautionary')}

      <Heading2 content="Surface - Negative" sx={{ marginTop: '120px' }} />

      <p>
        부정적인 상태나 오류를 배경으로 표현할 때 사용합니다. 더 강한 강조가
        필요한 경우 Strong을 사용합니다.
      </p>

      {renderPalette(theme.semantic.surface.negative, 'surface-negative')}

      <Heading2 content="Surface - Disable" sx={{ marginTop: '120px' }} />

      <p>상호작용이 불가능한 비활성 상태의 표면에 사용합니다.</p>

      {renderPalette(theme.semantic.surface.disable, 'surface-disable')}

      <Heading2 content="Surface - Accent" sx={{ marginTop: '120px' }} />

      <p>
        시각적 대비를 명확하게 유지하기 위해 배경과 같은 뒤쪽 요소에 사용하는
        색상입니다. Opaque는 투명도가 없는 색상으로 표면이 겹치는 경우
        사용합니다.
      </p>

      {renderPalette(theme.semantic.surface.accent, 'surface-accent')}

      <Heading2 content="Line - Neutral" sx={{ marginTop: '120px' }} />

      <p>
        Divider, Border 등 요소 간의 구분이 필요한 경우 사용합니다. 투명 값이
        포함된 색상으로 라인이 중첩되는 경우 투명도가 없는 Opaque를 사용하여
        중첩을 방지합니다.
      </p>

      {renderPalette(theme.semantic.line.neutral, 'line-neutral')}

      <Heading2 content="Line - Brand" sx={{ marginTop: '120px' }} />

      <p>
        브랜드 컬러가 필요한 Border에 사용합니다. Focus는 상호작용 요소의 포커스
        상태를 표현할 때 사용합니다.
      </p>

      {renderPalette(theme.semantic.line.brand, 'line-brand')}

      <Heading2 content="Line - Positive" sx={{ marginTop: '120px' }} />

      <p>긍정적인 상태를 Border로 표현할 때 사용합니다.</p>

      {renderPalette(theme.semantic.line.positive, 'line-positive')}

      <Heading2 content="Line - Cautionary" sx={{ marginTop: '120px' }} />

      <p>주의가 필요한 상태를 Border로 표현할 때 사용합니다.</p>

      {renderPalette(theme.semantic.line.cautionary, 'line-cautionary')}

      <Heading2 content="Line - Negative" sx={{ marginTop: '120px' }} />

      <p>
        부정적인 상태나 오류를 Border로 표현할 때 사용합니다. Focus는 오류
        상태의 포커스 상태를 표현할 때 사용합니다.
      </p>

      {renderPalette(theme.semantic.line.negative, 'line-negative')}

      <Heading2 content="Line - Accent" sx={{ marginTop: '120px' }} />

      <p>
        시각적 대비를 명확하게 유지하기 위해 Border에 사용하는 강조 색상입니다.
      </p>

      {renderPalette(theme.semantic.line.accent, 'line-accent')}

      <Heading2 content="Effect - Dimmer" sx={{ marginTop: '120px' }} />

      <p>
        모달과 같이 층위가 생길 때 배경과의 구분을 위해 어둡게 표시해야할 때
        사용합니다.
      </p>

      {renderPalette(theme.semantic.effect.dimmer, 'effect-dimmer')}

      <Heading2 content="Effect - Transparent" sx={{ marginTop: '120px' }} />

      <p>
        Chrome 효과를 적용할 때 사용하는 투명도가 포함 된 배경 색상입니다.
        Android에서만 Secondary를 사용합니다.
      </p>

      {renderPalette(theme.semantic.effect.transparent, 'effect-transparent')}

      <Heading2 content="Static" sx={{ marginTop: '120px' }} />

      <p>
        Light, Dark 테마에 상관없이 고정된 고유 색으로 테마가 변경되더라도
        색상을 유지하여 해당 요소에 대비를 줄 때 사용합니다.
      </p>

      {renderPalette(theme.semantic.static, 'static')}
    </>
  );
};

export default FoundationsColorsSemantic;
