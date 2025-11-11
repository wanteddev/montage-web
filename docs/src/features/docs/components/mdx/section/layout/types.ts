export type DescriptionListItem = {
  type: 'list';
  content: string;
  children: Array<DescriptionListItem>;
};

export type DescriptionTextItem = {
  type: 'text';
  content: string;
};

export type DescriptionContentItem = DescriptionListItem | DescriptionTextItem;
