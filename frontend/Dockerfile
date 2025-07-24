# syntax=docker/dockerfile:1
ARG VOLTO_VERSION=18.23.0
FROM plone/frontend-builder:18.23.0 AS builder

# Copiar todos os arquivos necessários primeiro
COPY --chown=node package.json /app/
COPY --chown=node pnpm-workspace.yaml /app/
COPY --chown=node volto.config.js /app/

# Copiar addons locais
COPY --chown=node packages/volto-cmcuritiba /app/packages/volto-cmcuritiba
COPY --chown=node packages/volto-partidos /app/packages/volto-partidos
COPY --chown=node packages/volto-mui-blocks /app/packages/volto-mui-blocks
COPY --chown=node packages/volto-dropdownmenu /app/packages/volto-dropdownmenu

RUN --mount=type=cache,id=pnpm,target=/app/.pnpm-store,uid=1000 <<EOT
    set -e
    pnpm install && pnpm build:deps
    pnpm build
    pnpm install --prod
EOT

FROM plone/frontend-prod-config:18.23.0

LABEL maintainer="Digigroup e DTIC <vinicius@digigroup.com.br>" \
      org.label-schema.name="cmcuritiba-frontend" \
      org.label-schema.description="Câmara de Curitiba frontend image." \
      org.label-schema.vendor="Digigroup e DTIC"

COPY --from=builder /app/ /app/

RUN <<EOT
    set -e
    npm i -g corepack@latest && corepack enable pnpm
    corepack use pnpm@9.1.1
    corepack prepare pnpm@9.1.1 --activate
EOT
