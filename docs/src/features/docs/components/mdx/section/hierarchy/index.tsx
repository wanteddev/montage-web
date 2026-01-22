import * as React from 'react';
import * as Wds from '@wanteddev/wds';
import { FlexBox } from '@wanteddev/wds';
import { useMemo } from 'react';

import { Heading2, SectionDescription } from '../layout';
import { sectionLayoutStyle } from '../style';
import { useRunner } from '../../demo/react-runner';

import { sectionHierarchyItemStyle } from './style';
import { makeSectionHierarchyCode } from './helpers';

import type { PropsWithChildren } from 'react';

type SectionHierarchyProps = PropsWithChildren<{
  title?: string;
}>;

const SectionHierarchy = ({
  children,
  title = 'Hierarchy',
}: SectionHierarchyProps) => {
  return (
    <FlexBox
      flexDirection="column"
      data-role="hierarchy"
      sx={sectionLayoutStyle}
    >
      <Heading2 content={title} sx={{ marginBottom: '12px !important' }} />
      <FlexBox flexDirection="column">{children}</FlexBox>
    </FlexBox>
  );
};

type SectionHierarchyItemProps = {
  description: string;
  render: string;
  components: Array<string>;
};

const SectionHierarchyItem = ({
  description,
  render,
  components,
}: SectionHierarchyItemProps) => {
  const scope = useMemo(() => {
    return {
      import: {
        react: React,
        '@wanteddev/wds': Wds,
      },
    };
  }, []);

  const code = useMemo(() => {
    return makeSectionHierarchyCode(components, render);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { element } = useRunner({
    code,
    scope,
  });

  return (
    <FlexBox sx={sectionHierarchyItemStyle}>
      {element}

      <SectionDescription content={description} />
    </FlexBox>
  );
};

export { SectionHierarchy, SectionHierarchyItem };
