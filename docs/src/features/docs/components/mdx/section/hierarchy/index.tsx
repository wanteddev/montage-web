import * as Montage from '@montage-ui/core';
import { FlexBox } from '@montage-ui/core';
import * as React from 'react';
import { useMemo } from 'react';

import { useRunner } from '../../demo/react-runner';
import { Heading2, SectionDescription } from '../layout';
import { sectionLayoutStyle } from '../style';

import { makeSectionHierarchyCode } from './helpers';
import { sectionHierarchyItemStyle } from './style';

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
        '@montage-ui/core': Montage,
      },
    };
  }, []);

  const code = useMemo(() => {
    return makeSectionHierarchyCode(components, render);
    // oxlint-disable-next-line react-hooks/exhaustive-deps
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
