'use client';
import { FlexBox, Typography, useTheme } from '@wanteddev/wds';
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
                color="semantic.label.alternative"
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
        content="Primary"
        sx={{ '&&:first-of-type': { marginTop: '0px' } }}
      />

      <p>
        화면 내에서 가장 중요한 요소를 표현할 때 사용합니다. Normal, Strong,
        Heavy와 같이 3가지 타입이 존재하며 상황에 맞게 적절히 선택하여
        사용합니다.
      </p>

      {renderPalette(theme.semantic.primary, 'primary')}

      <Heading2 content="Label" sx={{ marginTop: '120px' }} />

      <p>
        화면 내에서 가장 중요한 요소를 표현할 때 사용합니다. Normal, Strong,
        Heavy와 같이 3가지 타입이 존재하며 상황에 맞게 적절히 선택하여
        사용합니다.
      </p>

      {renderPalette(theme.semantic.label, 'label')}

      <Heading2 content="Fill" sx={{ marginTop: '120px' }} />

      <p>
        어떠한 요소에서 배경 색상이 필요한 경우 사용하는 투명도가 포함된
        색상입니다. 정보가 있는 패널과 배경을 구분해야할 때 패널에 색상을 채워
        사용합니다.
      </p>

      {renderPalette(theme.semantic.fill, 'fill')}

      <Heading2 content="Line - Normal" sx={{ marginTop: '120px' }} />

      <p>
        Divider, Border 등 요소 간의 구분이 필요한 경우 사용합니다. 투명 값이
        포함된 색상으로 라인을 중첩하여 사용하지 않도록 유의하여 사용합니다.
      </p>

      {renderPalette(theme.semantic.line.normal, 'line-normal')}

      <Heading2 content="Line - Solid" sx={{ marginTop: '120px' }} />

      <p>
        Border와 Divider를 중첩하여 사용할 때 중첩을 방지 하고자 사용합니다.
      </p>

      {renderPalette(theme.semantic.line.solid, 'line-solid')}

      <Heading2 content="Background - Normal" sx={{ marginTop: '120px' }} />

      <p>
        일반적인 화면의 배경 색상으로 활용합니다. 카드 UI와 같이 어떠한 요소와
        배경의 구분을 분명히 둬야할 때 Alternative를 사용하여 대비를 줍니다.
      </p>

      {renderPalette(theme.semantic.background.normal, 'background-normal')}

      <Heading2 content="Background - Elevated" sx={{ marginTop: '120px' }} />

      <p>
        모달과 같이 층위가 있는 페이지 사용하는 배경 색상으로 다크 모드에서
        Background-Normal과의 색상 차이가 있습니다.
      </p>

      {renderPalette(theme.semantic.background.elevated, 'background-elevated')}

      <Heading2
        content="Background - Transparent"
        sx={{ marginTop: '120px' }}
      />

      <p>
        Chrome 효과를 적용할 때 사용하는 투명도가 포함 된 배경 색상입니다.
        Android에서만 Alternative를 사용합니다.
      </p>

      {renderPalette(
        theme.semantic.background.transparent,
        'background-transparent',
      )}

      <Heading2 content="Static" sx={{ marginTop: '120px' }} />

      <p>
        Light, Dark 테마에 상관없이 고정된 고유 색으로 테마가 변경되더라도
        색상을 유지하여 해당 요소에 대비를 줄 때 사용합니다.
      </p>

      {renderPalette(theme.semantic.static, 'static')}

      <Heading2 content="Inverse" sx={{ marginTop: '120px' }} />

      <p>
        테마의 대비가 반대인 요소에 적용하는 색상입니다. 주로 Tooltip과 같이
        배경과 확실히 구분되어 정보를 인지 시키는 용도로 사용합니다.
      </p>

      {renderPalette(theme.semantic.inverse, 'inverse')}

      <Heading2 content="Interaction" sx={{ marginTop: '120px' }} />

      <p>
        상호작용 요소에서 활성화가 가능하거나 상호작용이 불가능한 상태를 표현할
        때 사용합니다.
      </p>

      {renderPalette(theme.semantic.interaction, 'interaction')}

      <Heading2 content="Status" sx={{ marginTop: '120px' }} />

      <p>
        Positive, Cautionary, Negative 등 요소의 상태를 표현해야할 때
        사용합니다.
      </p>

      {renderPalette(theme.semantic.status, 'status')}

      <Heading2 content="Accent - Foreground" sx={{ marginTop: '120px' }} />

      <p>
        시각적 대비를 명확하게 유지하기 위해 앞쪽 요소에 사용하는 색상입니다.
      </p>

      {renderPalette(theme.semantic.accent.foreground, 'accent-foreground')}

      <Heading2 content="Accent - Background" sx={{ marginTop: '120px' }} />

      <p>
        시각적 대비를 명확하게 유지하기 위해 배경과 같은 뒤쪽 요소에 사용하는
        색상입니다.
      </p>

      {renderPalette(theme.semantic.accent.background, 'accent-background')}

      <Heading2 content="Material" sx={{ marginTop: '120px' }} />

      <p>
        모달과 같이 층위가 생길 때 배경과의 구분을 위해 어둡게 표시해야할 때
        사용합니다.
      </p>

      {renderPalette(theme.semantic.material, 'material')}
    </>
  );
};

export default FoundationsColorsSemantic;
