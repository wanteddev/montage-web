import { Box } from '@wanteddev/wds';

type Props = {
  src: string;
  alt?: string;
};

const Thumbnail = ({ src, alt }: Props) => {
  return (
    <Box
      as="img"
      src={src}
      alt={alt ?? 'thumbnail'}
      sx={{ width: '100%', margin: '20px 0px' }}
      loading="lazy"
    />
  );
};

export default Thumbnail;
