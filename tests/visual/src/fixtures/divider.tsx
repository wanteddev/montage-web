import { Divider } from '@wanteddev/wds';

export const HorizontalDivider = () => {
  return (
    <>
      <Divider />
      <Divider size="200px" />
      <Divider size="300px" thickness="2px" />
      <Divider size="150px" thickness="1px" />
    </>
  );
};

export const VerticalDivider = () => {
  return (
    <div style={{ display: 'flex', height: '100px', alignItems: 'center' }}>
      <Divider vertical />
      <Divider vertical size="50px" />
      <Divider vertical size="80px" thickness="2px" />
      <Divider vertical size="60px" thickness="1px" />
    </div>
  );
};
