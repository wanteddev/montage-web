import fs from 'node:fs';
import path from 'node:path';

import { downloadImage, getImages, getNodes } from './api';
import { parseComponentFrontmatter, parseComponentSections } from './parser';
import {
  getComponentDirectory,
  getComponentImageDirectory,
  getImageNames,
} from './helpers';
import { FIGMA_ESCAPE_LINE_BREAK } from './constants';

import type { FrameNode } from '@figma/rest-api-spec';
import type { FigmaNode, Page } from './types';

export const processPage = async (page: Page, fileKey: string) => {
  console.log(`Processing page ${page.name}`);

  const response = await getNodes(fileKey, { ids: page.id });

  const document = response.nodes[page.id].document as FrameNode;

  const elements = document.children.find(
    ({ name, type }) =>
      name.toLowerCase().startsWith('component/') && type === 'FRAME',
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

  const content = (
    await parseComponentSections(elements, pageName, group)
  ).replaceAll(FIGMA_ESCAPE_LINE_BREAK, '\n');

  if (
    fs.existsSync(
      path.join(getComponentDirectory(pageName, group), 'design.mdx'),
    )
  ) {
    const prevContent = fs.readFileSync(
      path.join(getComponentDirectory(pageName, group), 'design.mdx'),
      'utf8',
    );

    const stripUpdatedAt = (s: string) =>
      s.replace(/^updatedAt: .*$/m, '').trim();

    if (stripUpdatedAt(prevContent) === stripUpdatedAt(frontmatter + content)) {
      return { content: '', isUpdated: false };
    }
  }

  return {
    content: frontmatter + content,
    isUpdated: true,
  };
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

  const imageDownloadUrls = await getImages(fileKey, {
    ids: imageIds.join(','),
    scale: 2,
    format: 'png',
  });

  if (Object.keys(imageDownloadUrls.images).length === 0) {
    throw new Error(`No images found for ${pageName}`);
  }

  const entries = Object.entries(imageDownloadUrls.images);

  // 전부 받은 뒤에 기존 이미지를 교체해 중간 실패 시 이미지가 비지 않도록 한다
  const imageBuffers = await Promise.all(
    entries.map(async ([id, url]) => {
      if (!url) {
        throw new Error(`Failed to render image ${id} for ${pageName}`);
      }

      return downloadImage(url);
    }),
  );

  const files = fs.globSync(path.join(directory, 'Image*.png'));

  files.forEach((file) => {
    fs.rmSync(file);
  });

  imageBuffers.forEach((imageBuffer, i) => {
    fs.writeFileSync(path.join(directory, getImageNames(i)), imageBuffer);
  });
};
