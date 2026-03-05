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
  try {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);

    res.on('close', () => {
      transport.close();
      server.close();
    });
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
app.listen(PORT, (error) => {
  if (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }

  console.log(`MCP Stateless Streamable HTTP Server listening on port ${PORT}`);
});

// Handle server shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  process.exit(0);
});
