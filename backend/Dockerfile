# syntax=docker/dockerfile:1
ARG PLONE_VERSION
FROM plone/server-builder:${PLONE_VERSION:-6.0.14} AS builder

WORKDIR /app

# Add local code
COPY . .

# Install local requirements and pre-compile mo files
RUN <<EOT
    set -e
    bin/pip install mxdev
    mv requirements-docker.txt requirements.txt
    sed -i 's/-e src\/camara_de_curitiba\[test\]/src\/camara_de_curitiba/g' mx.ini
    bin/mxdev -c mx.ini
    bin/pip install -r requirements-mxdev.txt
    bin/python /compile_mo.py
    rm -Rf src/
EOT

FROM plone/server-prod-config:${PLONE_VERSION:-6.0.14}

LABEL maintainer="Plone Foundation <collective@plone.org>" \
      org.label-schema.name="camara-de-curitiba-backend" \
      org.label-schema.description="Câmara de Curitiba backend image." \
      org.label-schema.vendor="Plone Foundation" \
      org.opencontainers.image.source="https://github.com/cmcuritiba/portal"

# Copy /app from builder
COPY --from=builder /app /app

RUN <<EOT
    set -e
    ln -s /data /app/var
EOT

# Adiciona variáveis de ambiente para Keycloak
ENV KEYCLOAK_CLIENT_SECRET=""
ENV KEYCLOAK_CLIENT_ID=""
ENV KEYCLOAK_ISSUER=""
ENV KEYCLOAK_OPEN_ID_SCOPES=""
