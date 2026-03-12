import crypto from 'node:crypto';

import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { mcpAuthRouter } from '@modelcontextprotocol/sdk/server/auth/router.js';
import { requireBearerAuth } from '@modelcontextprotocol/sdk/server/auth/middleware/bearerAuth.js';
import express from 'express';

import { getServer } from './server';
import {
  createOAuthProvider,
  firestore,
  getServerUrl,
  handleGoogleCallback,
} from './auth';

import type { TrackEvent } from './track';

const PORT = parseInt(process.env.PORT ?? '3000', 10);

const app = express();

app.set('trust proxy', 2);
app.use(express.json({ limit: '256kb' }));

const provider = createOAuthProvider();
const telemetryCollection = firestore
  .collection('tracks')
  .doc('events')
  .collection('list');
const telemetryClients = firestore.collection('tracks').doc('clients');

let clientRegistry: Record<string, string> = {};

const initialClientsSnap = await telemetryClients.get();
clientRegistry = (initialClientsSnap.data() ?? {}) as Record<string, string>;

const unsubscribeClientRegistry = telemetryClients.onSnapshot(
  (snap) => {
    clientRegistry = (snap.data() ?? {}) as Record<string, string>;
  },
  (error) => {
    console.error('Failed to subscribe to telemetry clients:', error);
  },
);

// MCP OAuth routes (metadata, authorize, token, register, revoke)
app.use(
  mcpAuthRouter({
    provider,
    issuerUrl: new URL(getServerUrl()),
    scopesSupported: ['openid', 'email', 'profile'],
  }),
);

// Google OAuth callback
app.get('/oauth/google/callback', handleGoogleCallback);

app.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

const sha256 = (input: string): string =>
  crypto.createHash('sha256').update(input).digest('hex');

app.post('/track', async (req, res) => {
  const event = req.body as TrackEvent | undefined;

  if (!event || typeof event !== 'object' || !event.name) {
    res.status(400).json({ error: 'invalid event' });
    return;
  }

  if (!event.clientId || !['web', 'ios', 'android'].includes(event.platform)) {
    res.status(400).json({ error: 'invalid client id or platform' });
    return;
  }

  if (!['http', 'stdio'].includes(event.transport)) {
    res.status(400).json({ error: 'invalid transport' });
    return;
  }

  if (clientRegistry[event.platform] !== event.clientId) {
    res.status(400).json({ error: 'invalid client id' });
    return;
  }

  let deviceId = event.deviceId;

  if (!deviceId) {
    const forwardedFor = req.headers['x-forwarded-for'];
    const ip =
      (typeof forwardedFor === 'string'
        ? forwardedFor.split(',')[0]?.trim()
        : Array.isArray(forwardedFor)
          ? forwardedFor[0]
          : undefined) ??
      req.ip ??
      '';
    const userAgent = req.header('User-Agent') ?? '';

    deviceId = `synthetic-${sha256(`${ip}|${userAgent}`).slice(0, 16)}`;
  }

  try {
    await telemetryCollection.add({
      ...event,
      deviceId,
      timestamp: event.timestamp ?? new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to persist telemetry event:', error, event);
  }

  res.status(202).json({ ok: true });
});

// Bearer auth middleware for MCP endpoints
const auth = requireBearerAuth({ verifier: provider });

app.post('/mcp', auth, async (req, res) => {
  const email =
    typeof req.auth?.extra?.email === 'string' ? req.auth.extra.email : '';
  const userId = email.toLowerCase() || null;

  const server = getServer({
    transport: 'http',
    platform: 'web',
    trackContext: {
      clientId: process.env.MCP_TRACK_CLIENT_ID!,
      deviceId: userId,
    },
  });

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
  });

  res.once('close', () => {
    transport.close();
    server.close();
  });

  try {
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error('Error handling MCP request:', error);

    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32_603,
          message: 'Internal server error',
        },
        id: null,
      });
    }
  }
});

app.get('/mcp', (_, res) => {
  res.writeHead(405).end(
    JSON.stringify({
      jsonrpc: '2.0',
      error: {
        code: -32_000,
        message: 'Method not allowed.',
      },
      id: null,
    }),
  );
});

app.delete('/mcp', (_, res) => {
  res.writeHead(405).end(
    JSON.stringify({
      jsonrpc: '2.0',
      error: {
        code: -32_000,
        message: 'Method not allowed.',
      },
      id: null,
    }),
  );
});

// Start the server
const httpServer = app.listen(PORT, (error) => {
  if (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }

  console.log(`MCP Stateless Streamable HTTP Server listening on port ${PORT}`);
});

const shutdown = () => {
  console.log('Shutting down server...');
  unsubscribeClientRegistry();
  httpServer.close(() => process.exit(0));
};

// Handle server shutdown
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
