import crypto from 'node:crypto';

import { cert, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import {
  AccessDeniedError,
  InvalidGrantError,
  InvalidRequestError,
  InvalidTokenError,
  ServerError,
} from '@modelcontextprotocol/sdk/server/auth/errors.js';

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

const pendingAuths = new TtlMap<string, PendingAuth>();
const authCodes = new TtlMap<string, StoredAuthCode>();

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
    if (!client.redirect_uris.includes(params.redirectUri)) {
      throw new InvalidRequestError(
        'Redirect URI not registered for this client',
      );
    }

    const state = crypto.randomUUID();

    const googleAuthUrl = new URL(
      'https://accounts.google.com/o/oauth2/v2/auth',
    );
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

    pendingAuths.set(
      state,
      {
        clientId: client.client_id,
        redirectUri: params.redirectUri,
        originalState: params.state,
        codeChallenge: params.codeChallenge,
      },
      TTL.PENDING_AUTH,
    );

    res.redirect(googleAuthUrl.toString());
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

    if (!decoded.email?.endsWith(`@${ALLOWED_DOMAIN}`)) {
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
