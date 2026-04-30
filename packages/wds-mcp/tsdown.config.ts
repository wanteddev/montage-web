import fs from 'node:fs';

import { defineConfiguration } from '../../.tsdown/define-configuration.ts';

const rawTextPlugin = () => ({
  name: 'raw-text',
  transform(_: unknown, id: string) {
    if (id.endsWith('.md')) {
      const content = fs.readFileSync(id, 'utf-8');
      return {
        code: `export default ${JSON.stringify(content)};`,
        map: null,
      };
    }
  },
});

const jsonPlugin = () => ({
  name: 'json-default-export',
  load(id: string) {
    if (id.endsWith('.json') && !id.endsWith('package.json')) {
      const content = fs.readFileSync(id, 'utf-8');
      return {
        code: `export default (${content});`,
        moduleType: 'js',
      };
    }
  },
});

export default defineConfiguration({
  entry: ['src/**/*.ts', 'src/**/*.tsx'],
  format: ['esm'],
  define: {
    // This is private package, inject client id in bundle file
    'process.env.MCP_TRACK_CLIENT_ID': JSON.stringify(
      process.env.MCP_TRACK_CLIENT_ID ?? '',
    ),
  },
  plugins: [rawTextPlugin(), jsonPlugin()],
});
