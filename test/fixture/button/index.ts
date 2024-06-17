import type { Fixture } from '../../types';

export const button: Fixture = {
  name: 'button',
  select: async (page) => {
    await page.waitForSelector('button');
  },
  code: `import { Button, FlexBox } from '@wanteddev/wds';
import { IconCheck } from '@wanteddev/wds-icon';

const Demo = () => {
  return (
    <FlexBox gap="8px" flexWrap="wrap">
      <Button variant="solid" color="primary">텍스트</Button>
      <Button variant="solid" color="primary" iconOnly><IconCheck/></Button>
      <Button variant="solid" color="assistive">텍스트</Button>
      <Button variant="solid" color="assistive" iconOnly><IconCheck/></Button>
      <Button variant="outlined" color="primary">텍스트</Button>
      <Button variant="outlined" color="primary" iconOnly><IconCheck/></Button>
      <Button variant="outlined" color="secondary">텍스트</Button>
      <Button variant="outlined" color="secondary" iconOnly><IconCheck/></Button>
      <Button variant="outlined" color="assistive">텍스트</Button>
      <Button variant="outlined" color="assistive" iconOnly><IconCheck/></Button>
    </FlexBox>
  )
}

export default Demo;`,
};
