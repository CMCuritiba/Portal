#!/bin/bash

echo "🧪 Teste Towncrier direto..."

# Configurar PATH
export PATH="/root/.local/bin:$PATH"

# Limpar fragments antigos
rm -rf backend/news/*/0*.md
rm -rf news/*/0*.md

# Criar fragment no repositório base
mkdir -p news/bugfix
echo "fix: teste towncrier direto" > news/bugfix/005-test.md

# Verificar se o fragment foi criado
echo "📄 Fragment criado:"
cat news/bugfix/005-test.md

# Tentar gerar changelog usando towncrier diretamente
echo "📝 Gerando changelog com towncrier..."
towncrier build --version 2.0.12 --yes

# Mostrar resultado
echo "📋 Resultado:"
if [ -f "CHANGELOG.md" ]; then
    tail -10 CHANGELOG.md
else
    echo "❌ Changelog não foi criado"
fi 