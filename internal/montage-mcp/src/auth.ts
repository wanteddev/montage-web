import crypto from 'node:crypto';

import {
  AccessDeniedError,
  InvalidGrantError,
  InvalidRequestError,
  InvalidTokenError,
  ServerError,
} from '@modelcontextprotocol/sdk/server/auth/errors.js';
import { redirectUriMatches } from '@modelcontextprotocol/sdk/server/auth/handlers/authorize.js';
import { cert, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

import { renderConsentPage } from './consent-page';

import type {
  AuthorizationParams,
  OAuthServerProvider,
} from '@modelcontextprotocol/sdk/server/auth/provider.js';
import type { AuthInfo } from '@modelcontextprotocol/sdk/server/auth/types.js';
import type {
  OAuthClientInformationFull,
  OAuthTokens,
} from '@modelcontextprotocol/sdk/shared/auth.js';
import type { Request, Response } from 'express';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? '';
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY ?? '';
const ALLOWED_DOMAIN = 'wantedlab.com';
const FETCH_TIMEOUT_MS = 10_000;

// The id_token comes straight from Google's token endpoint over TLS, so its
// signature does not need to be re-verified (OIDC Core 3.1.3.7).
const assertAllowedGoogleAccount = (idToken: string) => {
  let claims: { hd?: string; email_verified?: boolean };

  try {
    claims = JSON.parse(
      Buffer.from(idToken.split('.')[1] ?? '', 'base64url').toString(),
    );
  } catch {
    throw new ServerError('Malformed Google ID token');
  }

  if (claims.hd !== ALLOWED_DOMAIN || claims.email_verified !== true) {
    throw new AccessDeniedError(
      `Access restricted to @${ALLOWED_DOMAIN} accounts`,
    );
  }
};

const firebaseApp = initializeApp(
  {
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID ?? '',
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL ?? '',
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? '',
    }),
  },
  'server',
);

const firebaseAuth = getAuth(firebaseApp);

export const firestore = getFirestore(firebaseApp, 'montage-storage');

const refreshTokensCollection = firestore.collection('refreshTokens');
const clientsCollection = firestore.collection('clients');

interface PendingAuth {
  clientId: string;
  redirectUri: string;
  originalState?: string;
  codeChallenge: string;
}

interface StoredAuthCode {
  googleCode: string;
  clientId: string;
  codeChallenge: string;
}

const TTL = {
  PENDING_AUTH: 10 * 60 * 1000, // 10min
  AUTH_CODE: 5 * 60 * 1000, // 5min
} as const;

class TtlMap<K, V> {
  private map = new Map<K, { value: V; expiresAt: number }>();

  set(key: K, value: V, ttl: number) {
    this.map.set(key, { value, expiresAt: Date.now() + ttl });
  }

  get(key: K): V | undefined {
    const entry = this.map.get(key);

    if (!entry) return undefined;

    if (Date.now() > entry.expiresAt) {
      this.map.delete(key);
      return undefined;
    }

    return entry.value;
  }

  delete(key: K) {
    this.map.delete(key);
  }
}

const clientRegistrationStore = {
  async set(clientId: string, client: OAuthClientInformationFull) {
    try {
      await clientsCollection
        .doc(clientId)
        .set(JSON.parse(JSON.stringify(client)));
    } catch {
      throw new ServerError('Failed to persist client registration');
    }
  },

  async get(clientId: string): Promise<OAuthClientInformationFull | undefined> {
    try {
      const doc = await clientsCollection.doc(clientId).get();

      if (!doc.exists) return undefined;

      return doc.data() as OAuthClientInformationFull;
    } catch {
      throw new ServerError('Failed to load client registration');
    }
  },
};

const pendingConsents = new TtlMap<
  string,
  { auth: PendingAuth; browserTokenHash: string }
>();
const pendingAuths = new TtlMap<string, PendingAuth>();
const authCodes = new TtlMap<string, StoredAuthCode>();

const sha256 = (input: string) =>
  crypto.createHash('sha256').update(input).digest();

const consentCookie = (requestId: string) => {
  const secure = getServerUrl().startsWith('https://');

  return {
    // __Host- requires Secure, so local http development falls back to a plain name
    name: `${secure ? '__Host-' : ''}mcp-consent-${requestId}`,
    options: {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/',
      maxAge: TTL.PENDING_AUTH,
    },
  } as const;
};

const readCookie = (req: Request, name: string) =>
  req.headers.cookie
    ?.split(';')
    .map((pair) => pair.trim().split('='))
    .find(([key]) => key === name)?.[1];

const isSameOriginRequest = (req: Request) => {
  const origin = req.get('origin');

  if (origin) return origin === new URL(getServerUrl()).origin;

  return req.get('sec-fetch-site') === 'same-origin';
};

const redirectToGoogle = (pending: PendingAuth, res: Response) => {
  const state = crypto.randomUUID();

  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  googleAuthUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
  googleAuthUrl.searchParams.set(
    'redirect_uri',
    `${getServerUrl()}/oauth/google/callback`,
  );
  googleAuthUrl.searchParams.set('response_type', 'code');
  googleAuthUrl.searchParams.set('scope', 'openid email profile');
  googleAuthUrl.searchParams.set('hd', ALLOWED_DOMAIN);
  googleAuthUrl.searchParams.set('state', state);
  googleAuthUrl.searchParams.set('access_type', 'offline');
  googleAuthUrl.searchParams.set('prompt', 'consent');

  pendingAuths.set(state, pending, TTL.PENDING_AUTH);

  res.redirect(googleAuthUrl.toString());
};

interface StoredRefreshToken {
  clientId: string;
  googleRefreshToken: string;
}

const refreshTokenStore = {
  async set(mcpToken: string, value: StoredRefreshToken) {
    await refreshTokensCollection.doc(mcpToken).set({
      clientId: value.clientId,
      googleRefreshToken: value.googleRefreshToken,
    });
  },

  async get(mcpToken: string, clientId: string): Promise<string | undefined> {
    const doc = await refreshTokensCollection.doc(mcpToken).get();

    if (!doc.exists) return undefined;

    const data = doc.data() as StoredRefreshToken;

    if (data.clientId !== clientId) return undefined;

    return data.googleRefreshToken;
  },

  async delete(mcpToken: string) {
    await refreshTokensCollection.doc(mcpToken).delete();
  },
};

export const getServerUrl = () =>
  process.env.MCP_SERVER_URL || 'http://localhost:3000';

export const createOAuthProvider = (): OAuthServerProvider => ({
  clientsStore: {
    getClient: async (clientId: string) =>
      clientRegistrationStore.get(clientId),
    registerClient: async (client: OAuthClientInformationFull) => {
      await clientRegistrationStore.set(client.client_id, client);
      return client;
    },
  },

  async authorize(
    client: OAuthClientInformationFull,
    params: AuthorizationParams,
    res: Response,
  ) {
    if (
      !client.redirect_uris.some((uri) =>
        redirectUriMatches(params.redirectUri, String(uri)),
      )
    ) {
      throw new InvalidRequestError(
        'Redirect URI not registered for this client',
      );
    }

    // Registration is open and Google's own consent screen never shows where
    // the code goes, so the user approves each client here first (confused
    // deputy mitigation). The cookie binds the approval to this browser.
    const requestId = crypto.randomUUID();
    const browserToken = crypto.randomBytes(32).toString('base64url');
    const cookie = consentCookie(requestId);

    pendingConsents.set(
      requestId,
      {
        auth: {
          clientId: client.client_id,
          redirectUri: params.redirectUri,
          originalState: params.state,
          codeChallenge: params.codeChallenge,
        },
        browserTokenHash: sha256(browserToken).toString('base64url'),
      },
      TTL.PENDING_AUTH,
    );

    res
      .cookie(cookie.name, browserToken, cookie.options)
      .set({
        'Cache-Control': 'no-store',
        'Content-Security-Policy':
          "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'; base-uri 'none'",
        'X-Frame-Options': 'DENY',
      })
      .type('html')
      .send(
        renderConsentPage({
          requestId,
          clientName: client.client_name,
          redirectUri: params.redirectUri,
        }),
      );
  },

  async challengeForAuthorizationCode(
    _client: OAuthClientInformationFull,
    authorizationCode: string,
  ) {
    const codeInfo = authCodes.get(authorizationCode);
    return codeInfo?.codeChallenge ?? '';
  },

  async exchangeAuthorizationCode(
    client: OAuthClientInformationFull,
    authorizationCode: string,
  ) {
    const codeInfo = authCodes.get(authorizationCode);

    if (!codeInfo || codeInfo.clientId !== client.client_id) {
      throw new InvalidGrantError('Invalid authorization code');
    }

    // Exchange the Google auth code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: codeInfo.googleCode,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: `${getServerUrl()}/oauth/google/callback`,
        grant_type: 'authorization_code',
      }),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    }).catch((error) => {
      if (error instanceof DOMException && error.name === 'TimeoutError') {
        throw new ServerError('Google token exchange timed out');
      }
      throw new ServerError('Google token exchange failed');
    });

    if (!tokenResponse.ok) {
      throw new InvalidGrantError('Failed to exchange code with Google');
    }

    const googleTokens = (await tokenResponse.json()) as {
      access_token: string;
      id_token: string;
      expires_in: number;
      refresh_token?: string;
    };

    assertAllowedGoogleAccount(googleTokens.id_token);

    // Exchange Google ID token for Firebase ID token via REST API
    const firebaseResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postBody: `id_token=${googleTokens.id_token}&providerId=google.com`,
          requestUri: getServerUrl(),
          returnIdToken: true,
          returnSecureToken: true,
        }),
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      },
    ).catch((error) => {
      if (error instanceof DOMException && error.name === 'TimeoutError') {
        throw new ServerError('Firebase sign-in timed out');
      }
      throw new ServerError('Firebase sign-in failed');
    });

    if (!firebaseResponse.ok) {
      throw new ServerError('Firebase sign-in failed');
    }

    const firebaseTokens = (await firebaseResponse.json()) as {
      idToken: string;
      expiresIn: string;
      email?: string;
    };

    if (!firebaseTokens.email?.endsWith(`@${ALLOWED_DOMAIN}`)) {
      throw new AccessDeniedError(
        `Access restricted to @${ALLOWED_DOMAIN} accounts`,
      );
    }

    authCodes.delete(authorizationCode);

    // Store Google refresh token for later token renewal
    const tokens: OAuthTokens = {
      access_token: firebaseTokens.idToken,
      token_type: 'bearer',
      expires_in: Number(firebaseTokens.expiresIn),
      scope: 'openid email profile',
    };

    if (googleTokens.refresh_token) {
      const mcpRefreshToken = crypto.randomUUID();
      await refreshTokenStore.set(mcpRefreshToken, {
        clientId: client.client_id,
        googleRefreshToken: googleTokens.refresh_token,
      });
      tokens.refresh_token = mcpRefreshToken;
    }

    return tokens;
  },

  async exchangeRefreshToken(
    client: OAuthClientInformationFull,
    refreshToken: string,
  ) {
    const googleRefreshToken = await refreshTokenStore.get(
      refreshToken,
      client.client_id,
    );

    if (!googleRefreshToken) {
      throw new InvalidGrantError('Invalid or expired refresh token');
    }

    // Use Google refresh token to get new tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        refresh_token: googleRefreshToken,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        grant_type: 'refresh_token',
      }),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    }).catch((error) => {
      if (error instanceof DOMException && error.name === 'TimeoutError') {
        throw new ServerError('Google token refresh timed out');
      }
      throw new ServerError('Google token refresh failed');
    });

    if (!tokenResponse.ok) {
      // Only delete on permanent failures (token revoked/invalid)
      if (tokenResponse.status === 400 || tokenResponse.status === 401) {
        await refreshTokenStore.delete(refreshToken);
      }

      throw new InvalidGrantError('Failed to refresh Google token');
    }

    const googleTokens = (await tokenResponse.json()) as {
      access_token: string;
      id_token: string;
      expires_in: number;
      refresh_token?: string;
    };

    assertAllowedGoogleAccount(googleTokens.id_token);

    // Google may rotate refresh tokens
    if (googleTokens.refresh_token) {
      await refreshTokenStore.set(refreshToken, {
        clientId: client.client_id,
        googleRefreshToken: googleTokens.refresh_token,
      });
    }

    // Exchange new Google ID token for Firebase ID token
    const firebaseResponse = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postBody: `id_token=${googleTokens.id_token}&providerId=google.com`,
          requestUri: getServerUrl(),
          returnIdToken: true,
          returnSecureToken: true,
        }),
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      },
    ).catch((error) => {
      if (error instanceof DOMException && error.name === 'TimeoutError') {
        throw new ServerError('Firebase sign-in timed out');
      }
      throw new ServerError('Firebase sign-in failed');
    });

    if (!firebaseResponse.ok) {
      throw new ServerError('Firebase sign-in failed');
    }

    const firebaseTokens = (await firebaseResponse.json()) as {
      idToken: string;
      expiresIn: string;
      email?: string;
    };

    if (!firebaseTokens.email?.endsWith(`@${ALLOWED_DOMAIN}`)) {
      throw new AccessDeniedError(
        `Access restricted to @${ALLOWED_DOMAIN} accounts`,
      );
    }

    return {
      access_token: firebaseTokens.idToken,
      token_type: 'bearer',
      expires_in: Number(firebaseTokens.expiresIn),
      scope: 'openid email profile',
      refresh_token: refreshToken,
    } as OAuthTokens;
  },

  async verifyAccessToken(token: string): Promise<AuthInfo> {
    const decoded = await firebaseAuth.verifyIdToken(token).catch(() => {
      throw new InvalidTokenError('Invalid or expired token');
    });

    // Only Google sign-in proves domain ownership; other Firebase providers
    // could let anyone create an unverified @wantedlab.com account.
    if (
      decoded.firebase.sign_in_provider !== 'google.com' ||
      decoded.email_verified !== true ||
      !decoded.email?.endsWith(`@${ALLOWED_DOMAIN}`)
    ) {
      throw new InvalidTokenError(
        `Access restricted to @${ALLOWED_DOMAIN} accounts`,
      );
    }

    return {
      token,
      clientId: decoded.sub,
      scopes: ['openid', 'email', 'profile'],
      expiresAt: decoded.exp,
      extra: { email: decoded.email },
    };
  },
});

export const handleConsent = (req: Request, res: Response) => {
  if (!isSameOriginRequest(req)) {
    res.status(403).json({ error: 'Cross-origin consent is not allowed' });
    return;
  }

  const body = (req.body ?? {}) as { request_id?: unknown; action?: unknown };
  const requestId =
    typeof body.request_id === 'string' ? body.request_id : undefined;
  const pending = requestId ? pendingConsents.get(requestId) : undefined;

  if (!requestId || !pending) {
    res.status(400).json({ error: 'Invalid or expired consent request' });
    return;
  }

  pendingConsents.delete(requestId);

  const cookie = consentCookie(requestId);
  const browserToken = readCookie(req, cookie.name);

  res.clearCookie(cookie.name, { ...cookie.options, maxAge: undefined });

  if (
    !browserToken ||
    !crypto.timingSafeEqual(
      sha256(browserToken),
      Buffer.from(pending.browserTokenHash, 'base64url'),
    )
  ) {
    res.status(403).json({ error: 'Consent request was not started here' });
    return;
  }

  const { auth } = pending;

  if (body.action !== 'approve') {
    const redirectUrl = new URL(auth.redirectUri);
    redirectUrl.searchParams.set('error', 'access_denied');

    if (auth.originalState) {
      redirectUrl.searchParams.set('state', auth.originalState);
    }

    res.redirect(redirectUrl.toString());
    return;
  }

  redirectToGoogle(auth, res);
};

export const handleGoogleCallback = async (req: Request, res: Response) => {
  const { code, state, error } = req.query;

  if (typeof state !== 'string') {
    res.status(400).json({ error: 'Missing state parameter' });
    return;
  }

  const pending = pendingAuths.get(state);

  if (!pending) {
    res.status(400).json({ error: 'Invalid or expired state parameter' });
    return;
  }

  pendingAuths.delete(state);

  if (error || typeof code !== 'string') {
    const redirectUrl = new URL(pending.redirectUri);
    redirectUrl.searchParams.set(
      'error',
      typeof error === 'string' ? error : 'missing_code',
    );

    if (pending.originalState) {
      redirectUrl.searchParams.set('state', pending.originalState);
    }

    res.redirect(redirectUrl.toString());
    return;
  }

  const ourCode = crypto.randomUUID();

  authCodes.set(
    ourCode,
    {
      googleCode: code,
      clientId: pending.clientId,
      codeChallenge: pending.codeChallenge,
    },
    TTL.AUTH_CODE,
  );

  const redirectUrl = new URL(pending.redirectUri);
  redirectUrl.searchParams.set('code', ourCode);

  if (pending.originalState) {
    redirectUrl.searchParams.set('state', pending.originalState);
  }

  res.redirect(redirectUrl.toString());
};
