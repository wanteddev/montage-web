import fs from 'node:fs';
import path from 'node:path';

import { getImages, getNodes } from './api';
import { parseComponentFrontmatter, parseComponentSections } from './parser';
import {
  getComponentDirectory,
  getComponentImageDirectory,
  getImageNames,
} from './helpers';

import type { FrameNode } from '@figma/rest-api-spec';
import type { FigmaNode, Page } from './types';

export const processPage = async (page: Page, fileKey: string) => {
  console.log(`Processing page ${page.name}`);

  const response = await getNodes(fileKey, { ids: page.id });

  const document = response.nodes[page.id].document as FrameNode;

  const elements = document.children.find(
    ({ name, type }) =>
      name.toLowerCase().includes('component/') && type === 'FRAME',
  ) as FigmaNode | undefined;
  const images = document.children.find(
    ({ name, type }) => name.toLowerCase() === 'image' && type === 'FRAME',
  ) as FigmaNode | undefined;

  if (!elements || !images) {
    throw new Error('Elements or images not found');
  }

  const { content, isUpdated } = await processComponentGuide(
    elements,
    page.name,
    page.group,
  );

  await processImageDownload(images, fileKey, page.name, page.group);

  if (isUpdated) {
    fs.writeFileSync(
      path.join(getComponentDirectory(page.name, page.group), 'design.mdx'),
      content,
    );
  }
};

const processComponentGuide = async (
  elements: FigmaNode,
  pageName: string,
  group: string,
) => {
  const frontmatter = parseComponentFrontmatter(elements, pageName, group);

  const content = await parseComponentSections(elements, pageName, group);

  if (
    fs.existsSync(
      path.join(getComponentDirectory(pageName, group), 'design.mdx'),
    )
  ) {
    const prevContent = fs.readFileSync(
      path.join(getComponentDirectory(pageName, group), 'design.mdx'),
      'utf8',
    );

    if (
      prevContent.replace(/^---[\s\S]*?---\s*/, '').trim() === content.trim()
    ) {
      return { content: '', isUpdated: false };
    }
  }

  return { content: frontmatter + content, isUpdated: true };
};

const processImageDownload = async (
  image: FigmaNode,
  fileKey: string,
  pageName: string,
  group: string,
) => {
  const directory = getComponentImageDirectory(pageName, group);

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const imageIds = image.children
    .filter((node) => node.visible !== false)
    .map(({ id }) => id);

  console.log(`Get download urls for images ${pageName}`);

  const files = fs.globSync(path.join(directory, 'Image*.png'));

  files.forEach((file) => {
    fs.rmSync(file);
  });

  const imageDownloadUrls = await getImages(fileKey, {
    ids: imageIds.join(','),
    scale: 2,
    format: 'png',
  });

  if (Object.keys(imageDownloadUrls.images).length === 0) {
    throw new Error(`No images found for ${pageName}`);
  }

  const entries = Object.entries(imageDownloadUrls.images);

  await Promise.all(
    entries.map(async ([id, url], i) => {
      const fileResponse = await fetch(url as string);

      if (!fileResponse.ok) {
        throw new Error(`Failed to download image ${id} for ${pageName}`);
      }

      const imageBuffer = await fileResponse.arrayBuffer();

      fs.writeFileSync(
        path.join(directory, getImageNames(i)),
        Buffer.from(imageBuffer),
      );
    }),
  );
};
