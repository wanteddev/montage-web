import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';
import { execSync } from 'node:child_process';

import { DOCS_BASE_URL } from './constants';

const TRACK_TIMEOUT_MS = 2_000;
const GIT_TIMEOUT_MS = 1_000;

export type Platform = 'ios' | 'web' | 'android';

export type TrackEvent = {
  name: string;
  toolName?: string;
  transport: 'http' | 'stdio';
  platform: Platform;
  clientId: string;
  deviceId?: string | null;
  timestamp?: string;
  params?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
};

export const trackEvent = async (event: TrackEvent) => {
  const payload = {
    ...event,
    timestamp: event.timestamp ?? new Date().toISOString(),
  };

  await fetch(`${DOCS_BASE_URL}/track`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(TRACK_TIMEOUT_MS),
  }).catch(() => {
    // best-effort: 텔레메트리 실패는 silent
  });
};

const sha256 = (input: string): string =>
  crypto.createHash('sha256').update(input).digest('hex');

const getConfigDir = (): string => {
  return path.join(path.join(os.homedir(), '.config'), 'montage-mcp');
};

export const getOrCreateInstallationId = (): string => {
  if (process.env.CI) {
    return sha256(`ci:${os.hostname()}`).slice(0, 32);
  }

  const file = path.join(getConfigDir(), 'installation-id');

  try {
    const existing = fs.readFileSync(file, 'utf-8').trim();

    if (existing) return existing;
  } catch {
    // 첫 실행 또는 파일 없음
  }

  const id = crypto.randomUUID();

  try {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, id, { mode: 0o600 });
  } catch {
    // 쓰기 실패: 이번 세션만 사용
  }

  return id;
};

export const deriveUserIdHint = (): string | null => {
  try {
    const gitEmail = execSync('git config user.email', {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: GIT_TIMEOUT_MS,
    }).trim();

    if (gitEmail) {
      return gitEmail.toLowerCase();
    }
  } catch {
    // git 미설치 또는 user.email 미설정
  }

  return null;
};
