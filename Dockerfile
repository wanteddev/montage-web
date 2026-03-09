FROM node:22.18.0-alpine AS base

FROM base AS runner

WORKDIR /app

COPY ./standalone .

ENV PORT=3000
ENV HOST=0.0.0.0
ENV MCP_PATH=/mcp

EXPOSE 3000

CMD ["node", "dist/http.mjs"]
