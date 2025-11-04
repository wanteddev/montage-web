'use client';
import { Divider, Thumbnail, Typography } from '@wanteddev/wds';

import { Heading2 } from '../mdx/section/layout';

import { descriptionStyle } from './style';
import Resources from './resources';
import Principles from './principles';
import Steps from './steps';

const GettingStarted = () => {
  return (
    <>
      <Thumbnail
        radius
        src="/getting-started/overview/Image.png"
        alt="Getting Started"
        sx={{
          marginTop: '40px',
          marginBottom: '32px',
          aspectRatio: '195 / 58',
        }}
      />

      <Heading2 content="What is Montage" />

      <Typography
        variant="body2-reading"
        weight="regular"
        color="semantic.label.neutral"
        as="p"
        sx={descriptionStyle}
      >
        {`원티드가 꿈꿔온 세상은, 모든 일하는 사람이 더 나답게 일할 수 있는 세상입니다.
        그 꿈에 한 걸음 더 다가가기 위해, 우리는 디자인 시스템을 만들었습니다.`}
        <br />
        <br />
        <Typography variant="body2-reading" weight="bold" as="strong">
          몽타주는 완전한 오픈소스를 목표합니다.
        </Typography>
        <br />
        {`원티드는 모든 일하는 사람들이 더 나답게 일할 수 있는 세상을 만들어가기 위해
				일하는 문화를 아름답게 바꿔나가는 것에 기여하고 있습니다.`}
      </Typography>

      <Resources />

      <Divider color="semantic.line.normal.alternative" />

      <Heading2 content="Design Principles" />

      <Principles />

      <Divider color="semantic.line.normal.alternative" />

      <Heading2 content="Getting Started" />

      <Steps />
    </>
  );
};

export default GettingStarted;
