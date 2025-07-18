#!/bin/bash

# Script para limpar uma tag específica que está causando conflito
# Uso: ./scripts/clean-specific-tag.sh <tag_name>
# Exemplo: ./scripts/clean-specific-tag.sh v1.1.22

set -e

if [ $# -eq 0 ]; then
    echo "❌ Erro: Nome da tag não fornecido"
    echo "Uso: $0 <tag_name>"
    echo "Exemplo: $0 v1.1.22"
    exit 1
fi

TAG_NAME="$1"

echo "🧹 Limpando tag específica: $TAG_NAME"
echo ""

# Verificar se estamos em um branch válido
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" != "develop" && "$CURRENT_BRANCH" != "homolog" && "$CURRENT_BRANCH" != "main" && ! "$CURRENT_BRANCH" =~ ^hotfix/ ]]; then
    echo "⚠️  Aviso: Este script deve ser executado em develop, homolog, main ou hotfix/*"
    echo "Branch atual: $CURRENT_BRANCH"
    echo ""
fi

echo "1. Verificando se a tag existe..."
if git tag --list | grep -q "^$TAG_NAME$"; then
    echo "✅ Tag $TAG_NAME encontrada"
else
    echo "⚠️  Tag $TAG_NAME não encontrada localmente"
fi

echo ""
echo "2. Removendo tag localmente..."
git tag -d "$TAG_NAME" 2>/dev/null || echo "Tag $TAG_NAME não existe localmente"

echo ""
echo "3. Removendo tag do repositório remoto..."
git push origin ":refs/tags/$TAG_NAME" 2>/dev/null || echo "Tag $TAG_NAME não existe no remoto"

echo ""
echo "4. Verificando se a tag foi removida..."
if git tag --list | grep -q "^$TAG_NAME$"; then
    echo "❌ Tag $TAG_NAME ainda existe"
else
    echo "✅ Tag $TAG_NAME removida com sucesso"
fi

echo ""
echo "✅ Script executado com sucesso!"
echo ""
echo "Agora você pode executar o workflow novamente."
echo "O semantic-release deve conseguir criar a tag sem conflitos." 