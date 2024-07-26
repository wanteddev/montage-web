import { useListItemContext } from './contexts';

export const useListItem = (componentName: string) => {
  const { contentId } = useListItemContext(componentName);

  return {
    contentId,
  };
};
