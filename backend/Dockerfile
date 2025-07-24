# syntax=docker/dockerfile:1
ARG PLONE_VERSION=6.1.2
FROM plone/server-builder:${PLONE_VERSION} AS builder

WORKDIR /app


# Add local code
COPY scripts/ scripts/
COPY . src

# Install local requirements and pre-compile mo files
RUN <<EOT
    set -e
    bin/pip install mxdev uv
    sed -i 's/-e .\[test\]/./g' src/mx.ini
    cd /app/src
    # remove potentially existing virtualenv from local build
    rm -rf .venv
    ../bin/mxdev -c mx.ini
    ../bin/uv pip install -r requirements-mxdev.txt
    ../bin/python /compile_mo.py
EOT

FROM plone/server-prod-config:${PLONE_VERSION}

LABEL maintainer="Digigroup e DTIC <vinicius@digigroup.com.br>" \
      org.label-schema.name="camara_de_curitiba-backend" \
      org.label-schema.description="Câmara de Curitiba backend image." \
      org.label-schema.vendor="Digigroup e DTIC"

# Copy /app from builder
COPY --from=builder /app /app

RUN <<EOT
    set -e
    ln -s /data /app/var
EOT
