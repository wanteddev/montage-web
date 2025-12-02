import type { Metadata } from 'next';

type CreateMetadataParams = {
  title?: string;
  description?: string;
  image?: string;
  metadataBase?: string;
};

export const createMetadata = ({
  title: givenTitle = 'Wanted Design System',
  description,
  image,
  metadataBase,
}: CreateMetadataParams): Metadata => {
  const parsedDescription = description?.replace(/\n/g, ' ');

  const title = `${givenTitle} - Montage`;

  return {
    title,
    ...(parsedDescription && {
      description: parsedDescription,
    }),
    ...(metadataBase && {
      metadataBase: new URL(metadataBase),
    }),
    openGraph: {
      type: 'website',
      title,
      ...(parsedDescription && {
        description: parsedDescription,
      }),
      ...(image && {
        images: [{ url: image, width: 1200, height: 600 }],
      }),
    },
    twitter: {
      title,
      ...(parsedDescription && {
        description: parsedDescription,
      }),
      ...(image && {
        card: 'summary_large_image',
        images: [{ url: image, width: 1200, height: 600 }],
      }),
    },
  };
};
