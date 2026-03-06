FROM node:22.18.0-alpine AS base

FROM base AS runner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

WORKDIR /app

COPY --chown=nodejs:nodejs ./standalone .

ENV PORT=3000
ENV HOST=0.0.0.0
ENV MCP_PATH=/mcp

USER nodejs

EXPOSE 3000

CMD ["node", "dist/http.mjs"]
