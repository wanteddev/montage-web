import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { getServer } from './server';
import { deriveUserIdHint, getOrCreateInstallationId } from './track';

const server = getServer({
  transport: 'stdio',
  platform: 'web',
  trackContext: {
    clientId: process.env.MCP_TRACK_CLIENT_ID!,
    deviceId: deriveUserIdHint() ?? getOrCreateInstallationId(),
  },
});
const transport = new StdioServerTransport();

await server.connect(transport);
