#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import express from 'express';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';

import { server } from './server';

import type { IncomingMessage, ServerResponse } from 'http';
import type { Request, Response } from 'express';

export async function startServer(): Promise<void> {
  const isStdioMode =
    process.env.NODE_ENV === 'cli' || process.argv.includes('--stdio');

  if (isStdioMode) {
    const transport = new StdioServerTransport();
    await server.connect(transport);
  } else {
    console.log(`Initializing WDS MCP Server in HTTP mode on port 3000...`);

    const app = express();
    let sseTransport: SSEServerTransport | null = null;

    app.get('/sse', async (_: Request, res: Response) => {
      console.log('New SSE connection established');
      sseTransport = new SSEServerTransport(
        '/messages',
        res as unknown as ServerResponse<IncomingMessage>,
      );
      await server.connect(sseTransport);
    });

    app.post('/messages', async (req: Request, res: Response) => {
      if (!sseTransport) {
        res.sendStatus(400);
        return;
      }
      await sseTransport.handlePostMessage(
        req as unknown as IncomingMessage,
        res as unknown as ServerResponse<IncomingMessage>,
      );
    });

    app.listen(3000, () => {
      console.log(`HTTP server listening on port ${3000}`);
      console.log(`SSE endpoint available at http://localhost:${3000}/sse`);
      console.log(
        `Message endpoint available at http://localhost:${3000}/messages`,
      );
    });
  }
}

await startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
