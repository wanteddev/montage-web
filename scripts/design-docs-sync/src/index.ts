import { PART_1_FILE_KEY, PART_2_FILE_KEY } from './constants';
import { chunk, sleep } from './helpers';
import { parsePagesOfFile } from './parser';
import { executeImageProcessor, processPage } from './processor';

const IMAGE_CHUNK_SIZE = 12;
const PAGE_CHUNK_SIZE = 4;

const main = async () => {
  const pages = (await parsePagesOfFile(PART_1_FILE_KEY))
    .map((p) => ({
      ...p,
      fileKey: PART_1_FILE_KEY,
    }))
    .concat(
      (await parsePagesOfFile(PART_2_FILE_KEY)).map((p) => ({
        ...p,
        fileKey: PART_2_FILE_KEY,
      })),
    );

  const pageChunks = chunk(pages, PAGE_CHUNK_SIZE);

  for (let i = 0; i < pageChunks.length; i++) {
    const currentChunk = pageChunks[i];

    await Promise.all(currentChunk.map((p) => processPage(p, p.fileKey)));

    if (i < pageChunks.length - 1) {
      await sleep(1500);
    }
  }

  await executeImageProcessor(IMAGE_CHUNK_SIZE);
};

main();
