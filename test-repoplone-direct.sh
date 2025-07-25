#!/bin/bash

echo "🧪 Teste RepoPlone direto..."

# Configurar PATH
export PATH="/root/.local/bin:$PATH"

# Limpar fragments antigos
rm -rf backend/news/*/0*.md
rm -rf news/*/0*.md

# Criar fragment no repositório base
mkdir -p news/bugfix
echo "fix: teste repoplone" > news/bugfix/003-test.md

# Verificar se o fragment foi criado
echo "📄 Fragment criado:"
cat news/bugfix/003-test.md

# Tentar gerar changelog usando RepoPlone
echo "📝 Gerando changelog com RepoPlone..."
uvx repoplone changelog

# Mostrar resultado
echo "📋 Resultado:"
if [ -f "CHANGELOG.md" ]; then
    tail -20 CHANGELOG.md
else
    echo "❌ Changelog não foi criado"
fi 