import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express from 'express';

import { getServer } from './server';

const PORT = parseInt(process.env.PORT ?? '3000', 10);

const app = express();

app.use(express.json());

app.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

app.post('/mcp', async (req, res) => {
  const server = getServer();

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
  httpServer.close(() => process.exit(0));
};

// Handle server shutdown
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
