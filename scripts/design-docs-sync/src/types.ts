import type { SubcanvasNode } from '@figma/rest-api-spec';

export type Page = {
  id: string;
  name: string;
  group: string;
};

export type FigmaNode = Omit<SubcanvasNode, 'children'> & {
  children: Array<FigmaNode>;
};
