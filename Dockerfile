FROM node:24.22.1-alpine AS base

FROM base AS runner

WORKDIR /app

COPY ./standalone .

ENV PORT=3000
ENV HOST=0.0.0.0
ENV MCP_PATH=/mcp

ARG TRUST_PROXY_HOPS=2
ENV TRUST_PROXY_HOPS=$TRUST_PROXY_HOPS

EXPOSE 3000

CMD ["node", "dist/http.mjs"]
