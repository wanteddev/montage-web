import crypto from 'node:crypto';

import { cert, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

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

const registeredClients = new Map<string, OAuthClientInformationFull>();
const pendingAuths = new Map<string, PendingAuth>();
const authCodes = new Map<string, StoredAuthCode>();

export const getServerUrl = () =>
  process.env.MCP_SERVER_URL || 'http://localhost:3000';

export const createOAuthProvider = (): OAuthServerProvider => ({
  clientsStore: {
    getClient: async (clientId: string) => registeredClients.get(clientId),
    registerClient: async (client: OAuthClientInformationFull) => {
      registeredClients.set(client.client_id, client);
      return client;
    },
  },

  async authorize(
    client: OAuthClientInformationFull,
    params: AuthorizationParams,
    res: Response,
  ) {
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

    pendingAuths.set(state, {
      clientId: client.client_id,
      redirectUri: params.redirectUri,
      originalState: params.state,
      codeChallenge: params.codeChallenge,
    });

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
      throw new Error('Invalid authorization code');
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
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      throw new Error(`Failed to exchange code with Google: ${error}`);
    }

    const googleTokens = (await tokenResponse.json()) as {
      access_token: string;
      id_token: string;
      expires_in: number;
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
      },
    );

    if (!firebaseResponse.ok) {
      const error = await firebaseResponse.text();
      throw new Error(`Firebase sign-in failed: ${error}`);
    }

    const firebaseTokens = (await firebaseResponse.json()) as {
      idToken: string;
      expiresIn: string;
      email?: string;
    };

    if (!firebaseTokens.email?.endsWith(`@${ALLOWED_DOMAIN}`)) {
      throw new Error(`Access restricted to @${ALLOWED_DOMAIN} accounts`);
    }

    authCodes.delete(authorizationCode);

    // Return the Firebase ID token — verifiable statelessly via firebaseAuth.verifyIdToken()
    return {
      access_token: firebaseTokens.idToken,
      token_type: 'bearer',
      expires_in: Number(firebaseTokens.expiresIn),
      scope: 'openid email profile',
    } as OAuthTokens;
  },

  async exchangeRefreshToken() {
    throw new Error('Refresh tokens not supported');
  },

  async verifyAccessToken(token: string): Promise<AuthInfo> {
    const decoded = await firebaseAuth.verifyIdToken(token).catch((error) => {
      throw error;
    });

    if (!decoded.email?.endsWith(`@${ALLOWED_DOMAIN}`)) {
      throw new Error(`Access restricted to @${ALLOWED_DOMAIN} accounts`);
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

  if (error) {
    res.status(400).json({ error: `Google OAuth error: ${error}` });
    return;
  }

  if (typeof state !== 'string' || typeof code !== 'string') {
    res.status(400).json({ error: 'Missing code or state parameter' });
    return;
  }

  const pending = pendingAuths.get(state);

  if (!pending) {
    res.status(400).json({ error: 'Invalid or expired state parameter' });
    return;
  }

  pendingAuths.delete(state);

  const ourCode = crypto.randomUUID();

  authCodes.set(ourCode, {
    googleCode: code,
    clientId: pending.clientId,
    codeChallenge: pending.codeChallenge,
  });

  const redirectUrl = new URL(pending.redirectUri);
  redirectUrl.searchParams.set('code', ourCode);

  if (pending.originalState) {
    redirectUrl.searchParams.set('state', pending.originalState);
  }

  res.redirect(redirectUrl.toString());
};
