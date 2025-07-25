#!/bin/bash

echo "🧪 Teste de release..."

# Configurar PATH
export PATH="/root/.local/bin:$PATH"

# Limpar fragments antigos
rm -rf backend/news/*/0*.md
rm -rf news/*/0*.md

# Criar fragment no repositório base
mkdir -p news/bugfix
echo "fix: teste release" > news/bugfix/004-test.md

# Verificar se o fragment foi criado
echo "📄 Fragment criado:"
cat news/bugfix/004-test.md

# Tentar fazer uma release (dry-run)
echo "📝 Tentando release (dry-run)..."
echo "y" | uvx repoplone release patch --dry-run

# Mostrar resultado
echo "📋 Resultado:"
if [ -f "CHANGELOG.md" ]; then
    tail -20 CHANGELOG.md
else
    echo "❌ Changelog não foi criado"
fi 