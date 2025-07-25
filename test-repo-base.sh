#!/bin/bash

echo "🧪 Teste usando repositório base..."

# Configurar PATH
export PATH="/root/.local/bin:$PATH"

# Limpar fragments antigos
rm -rf backend/news/*/0*.md
rm -rf news/*/0*.md

# Criar fragment no repositório base
mkdir -p news/bugfix
echo "fix: teste repositório base" > news/bugfix/001-test.md

# Verificar se o fragment foi criado
echo "📄 Fragment criado no repositório base:"
cat news/bugfix/001-test.md

# Tentar gerar changelog usando towncrier diretamente
echo "📝 Gerando changelog com towncrier..."
cd /home/vinicius/Projetos/camara-curitiba/camara-de-curitiba
export PATH="/root/.local/bin:$PATH"

# Instalar towncrier se necessário
pip install towncrier

# Gerar changelog usando towncrier diretamente
towncrier build --version 2.0.9 --yes

# Mostrar resultado
echo "📋 Resultado:"
if [ -f "CHANGELOG.md" ]; then
    tail -10 CHANGELOG.md
else
    echo "❌ Changelog não foi criado"
fi 