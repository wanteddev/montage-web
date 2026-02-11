import { PART_1_FILE_KEY, PART_2_FILE_KEY } from './constants';
import { chunk, sleep } from './helpers';
import { parsePagesOfFile } from './parser';
import { processPage } from './processor';

/**
 * Figma API Rate Limits:
 * - Page parsing: 50 requests/min
 *
 * 트래픽에 따라 실제 제한이 더 적을 수 있어 80% 수준으로 설정
 *
 * PAGE: 4개 × (60s ÷ 6s) = 40개/분 (제한의 80%)
 */
const PAGE_CHUNK_SIZE = 4;
const PAGE_CHUNK_DELAY_MS = 6000;

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
      await sleep(PAGE_CHUNK_DELAY_MS);
    }
  }
};

main();
