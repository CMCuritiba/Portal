#!/bin/bash

echo "🧪 Teste simples do Towncrier..."

# Limpar fragments antigos
rm -rf backend/news/*/0*.md
rm -rf news/*/0*.md

# Criar um fragment de teste
mkdir -p backend/news/bugfix
echo "fix: teste simples" > backend/news/bugfix/001-test.md

# Verificar se o fragment foi criado
echo "📄 Fragment criado:"
cat backend/news/bugfix/001-test.md

# Tentar gerar changelog
echo "📝 Gerando changelog..."
uvx repoplone changelog

# Mostrar resultado
echo "📋 Resultado:"
if [ -f "backend/CHANGELOG.md" ]; then
    tail -10 backend/CHANGELOG.md
else
    echo "❌ Changelog não foi criado no backend"
fi

if [ -f "CHANGELOG.md" ]; then
    tail -10 CHANGELOG.md
else
    echo "❌ Changelog não foi criado no repositório"
fi 