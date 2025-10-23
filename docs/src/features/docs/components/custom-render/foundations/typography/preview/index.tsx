import { FlexBox, Slider, Typography } from '@wanteddev/wds';
import { useState } from 'react';

import { typographyVariants } from '../constants';

import type { TypographyProps } from '@wanteddev/wds';

const Preview = () => {
  const [value, setValue] = useState(typographyVariants.length - 1);

  return (
    <FlexBox sx={{ marginTop: '40px' }} flexDirection="column" gap="40px">
      <Typography
        variant={
          typographyVariants.toReversed()[value!]
            ?.name as TypographyProps['variant']
        }
        weight="bold"
        color="semantic.label.strong"
        sx={{ wordBreak: 'initial', minHeight: '144px' }}
      >
        Pretendard 프리텐다드 プリテンダード
      </Typography>
      <Slider
        min={0}
        max={typographyVariants.length - 1}
        value={[value]}
        onValueChange={([variantIndex]) => setValue(variantIndex!)}
        label={({ value: variantIndex }) =>
          typographyVariants.toReversed()[variantIndex!]?.label
        }
      />
    </FlexBox>
  );
};

export default Preview;
