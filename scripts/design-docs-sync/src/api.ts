import axios, { type AxiosError } from 'axios';

import { sleep } from './helpers';

import type {
  GetFileNodesQueryParams,
  GetFileNodesResponse,
  GetFileResponse,
  GetImagesQueryParams,
  GetImagesResponse,
} from '@figma/rest-api-spec';

const MAX_RETRIES = 5;

const client = axios.create({
  baseURL: 'https://api.figma.com/v1',
  headers: {
    'X-FIGMA-TOKEN': process.env.FIGMA_TOKEN,
  },
});

client.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const config = error.config;

    if (!config) {
      return Promise.reject(error);
    }

    // 재시도 횟수 추적
    const retryCount = (config as any).__retryCount ?? 0;

    // 429 Rate Limit 또는 재시도 가능한 에러 (5xx, 400 render timeout)
    const status = error.response?.status;
    const isRetryable =
      status === 429 || status === 400 || (status && status >= 500);

    if (!isRetryable || retryCount >= MAX_RETRIES) {
      return Promise.reject(error);
    }

    (config as any).__retryCount = retryCount + 1;

    const retryAfter = error.response?.headers['retry-after'];

    let delayMs: number;

    if (retryAfter) {
      const retryAfterSec = parseInt(retryAfter, 10);
      delayMs = isNaN(retryAfterSec) ? 3000 : retryAfterSec * 1000 + 1000;
    } else {
      // Retry-After가 없으면 exponential backoff
      delayMs = Math.min(1000 * Math.pow(2, retryCount), 10000);
    }

    console.warn(
      `[API] ${status} error on ${config.url}, retry ${retryCount + 1}/${MAX_RETRIES} after ${delayMs}ms`,
    );

    await sleep(delayMs);

    return client.request(config);
  },
);

export const getPages = (fileKey: string) =>
  client
    .get<GetFileResponse>(`/files/${fileKey}?depth=1`)
    .then((res) => res.data);

export const getNodes = (fileKey: string, params: GetFileNodesQueryParams) =>
  client
    .get<GetFileNodesResponse>(`/files/${fileKey}/nodes`, { params })
    .then((res) => res.data);

export const getImages = (fileKey: string, params: GetImagesQueryParams) =>
  client
    .get<GetImagesResponse>(`/images/${fileKey}`, { params })
    .then((res) => res.data);
