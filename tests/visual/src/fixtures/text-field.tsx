import { TextField, TextFieldContent } from '@wanteddev/wds';
import { IconBlank } from '@wanteddev/wds-icon';

export const DefaultTextField = () => {
  return (
    <>
      <TextField placeholder="Placeholder" />
      <TextField placeholder="With value" defaultValue="Value" />
      <TextField placeholder="Disabled" disabled />
      <TextField
        placeholder="Read only"
        readOnly
        defaultValue="Read only value"
      />
    </>
  );
};

export const InvalidTextField = () => {
  return (
    <>
      <TextField placeholder="Invalid" invalid />
      <TextField
        placeholder="Invalid with value"
        invalid
        defaultValue="Value"
      />
    </>
  );
};

export const PositiveTextField = () => {
  return (
    <>
      <TextField placeholder="Positive" positive />
      <TextField
        placeholder="Positive with value"
        positive
        defaultValue="Value"
      />
    </>
  );
};

export const TextFieldWithContent = () => {
  return (
    <>
      <TextField
        placeholder="With leading"
        leadingContent={
          <TextFieldContent variant="icon">
            <IconBlank />
          </TextFieldContent>
        }
      />
      <TextField
        placeholder="With trailing"
        trailingContent={
          <TextFieldContent variant="text">Text</TextFieldContent>
        }
      />
      <TextField
        placeholder="With both"
        leadingContent={
          <TextFieldContent variant="icon">
            <IconBlank />
          </TextFieldContent>
        }
        trailingContent={
          <TextFieldContent variant="text">Text</TextFieldContent>
        }
      />
    </>
  );
};
