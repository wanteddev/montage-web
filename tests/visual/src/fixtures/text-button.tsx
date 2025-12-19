import { TextButton } from '@wanteddev/wds';
import { IconBlank } from '@wanteddev/wds-icon';

export const PrimaryTextButton = () => {
  return (
    <>
      <TextButton color="primary" size="small">
        Button
      </TextButton>
      <TextButton color="primary" size="medium">
        Button
      </TextButton>
      <TextButton color="primary" size="small" disabled>
        Button
      </TextButton>
      <TextButton color="primary" size="medium" loading>
        Button
      </TextButton>
    </>
  );
};

export const AssistiveTextButton = () => {
  return (
    <>
      <TextButton color="assistive" size="small">
        Button
      </TextButton>
      <TextButton color="assistive" size="medium">
        Button
      </TextButton>
      <TextButton color="assistive" size="small" disabled>
        Button
      </TextButton>
      <TextButton color="assistive" size="medium" loading>
        Button
      </TextButton>
    </>
  );
};

export const TextButtonWithIcons = () => {
  return (
    <>
      <TextButton color="primary" leadingContent={<IconBlank />}>
        Button
      </TextButton>
      <TextButton color="primary" trailingContent={<IconBlank />}>
        Button
      </TextButton>
      <TextButton
        color="primary"
        leadingContent={<IconBlank />}
        trailingContent={<IconBlank />}
      >
        Button
      </TextButton>
    </>
  );
};
