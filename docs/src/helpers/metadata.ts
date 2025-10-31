import type { Metadata } from 'next';

type CreateMetadataParams = {
  title: string;
  description?: string;
  image?: string;
};

export const createMetadata = ({
  title,
  description,
  image,
}: CreateMetadataParams): Metadata => {
  const parsedDescription = description?.replace(/\n/g, ' ');

  return {
    title,
    ...(parsedDescription && {
      description: parsedDescription,
    }),
    openGraph: {
      type: 'website',
      title,
      ...(parsedDescription && {
        description: parsedDescription,
      }),
      ...(image && {
        images: [{ url: image, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      ...(parsedDescription && {
        description: parsedDescription,
      }),
      ...(image && {
        images: [{ url: image, width: 1200, height: 630 }],
      }),
    },
  };
};
