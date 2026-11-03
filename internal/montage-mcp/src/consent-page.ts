const LOOPBACK_HOSTS = ['localhost', '127.0.0.1', '[::1]'];

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

interface ConsentPageProps {
  requestId: string;
  clientName?: string;
  redirectUri: string;
}

export const renderConsentPage = ({
  requestId,
  clientName,
  redirectUri,
}: ConsentPageProps) => {
  const redirect = new URL(redirectUri);
  const isLoopback =
    redirect.protocol === 'http:' && LOOPBACK_HOSTS.includes(redirect.hostname);
  const redirectTarget = `${redirect.protocol}//${redirect.host}`;
  const name = clientName?.trim() || '이름 없는 앱';

  const warning = isLoopback
    ? '이 컴퓨터에서 실행 중인 앱으로 연결됩니다. 방금 직접 연결을 시작한 경우에만 승인하세요.'
    : '승인하면 아래 주소로 Montage MCP 접근 권한이 전달됩니다. 직접 요청하지 않았다면 거부하세요.';

  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Montage MCP 접근 승인</title>
<style>
  :root { color-scheme: light dark; --bg: #f7f7f8; --card: #fff; --text: #171719; --muted: #5a5c63; --line: #e1e2e4; --primary: #0066ff; --warn-bg: #fff4e5; --warn-text: #8a4b00; }
  @media (prefers-color-scheme: dark) { :root { --bg: #111113; --card: #1b1c1e; --text: #f7f7f8; --muted: #aeb0b6; --line: #2e2f33; --primary: #3385ff; --warn-bg: #3a2a12; --warn-text: #ffcf8a; } }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 16px; background: var(--bg); color: var(--text); font: 15px/1.5 -apple-system, BlinkMacSystemFont, "Pretendard", "Apple SD Gothic Neo", sans-serif; }
  main { width: 100%; max-width: 420px; background: var(--card); border: 1px solid var(--line); border-radius: 24px; padding: 24px; }
  h1 { margin: 0 0 8px; font-size: 20px; }
  p { margin: 0; color: var(--muted); }
  dl { margin: 20px 0; display: grid; gap: 12px; }
  dt { font-size: 13px; color: var(--muted); }
  dd { margin: 2px 0 0; font-weight: 600; word-break: break-all; }
  .note { font-weight: 400; font-size: 13px; color: var(--muted); }
  .warn { padding: 12px; border-radius: 10px; background: var(--warn-bg); color: var(--warn-text); font-size: 14px; }
  form { display: flex; gap: 8px; margin-top: 20px; }
  button { flex: 1; min-height: 48px; padding: 13px 20px; border-radius: 14px; font: inherit; font-size: 15px; line-height: 22px; letter-spacing: 0.0096em; font-weight: 600; cursor: pointer; border: none; box-shadow: inset 0 0 0 1px var(--line); background: transparent; color: var(--text); }
  button[value="approve"] { background: var(--primary); box-shadow: none; color: #fff; }
</style>
</head>
<body>
<main>
  <h1>Montage MCP 접근 승인</h1>
  <p>아래 앱이 내 계정으로 Montage MCP에 접근하려고 합니다.</p>
  <dl>
    <div>
      <dt>앱</dt>
      <dd>${escapeHtml(name)} <span class="note">(앱이 직접 등록한 이름)</span></dd>
    </div>
    <div>
      <dt>승인 후 이동할 주소</dt>
      <dd>${escapeHtml(redirectTarget)}</dd>
    </div>
  </dl>
  <p class="warn">${warning}</p>
  <form method="post" action="/oauth/consent">
    <input type="hidden" name="request_id" value="${escapeHtml(requestId)}">
    <button type="submit" name="action" value="deny">거부</button>
    <button type="submit" name="action" value="approve">승인</button>
  </form>
</main>
</body>
</html>`;
};
