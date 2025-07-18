#!/bin/bash

# Script para verificar o status das tags e diagnosticar problemas
# Uso: ./scripts/check-tags-status.sh

set -e

echo "🔍 Verificando status das tags..."
echo ""

# Verificar branch atual
CURRENT_BRANCH=$(git branch --show-current)
echo "Branch atual: $CURRENT_BRANCH"
echo ""

# Listar todas as tags
echo "📋 Todas as tags:"
git tag --list | sort -V
echo ""

# Encontrar última tag de develop (sem sufixos)
LATEST_DEVELOP_TAG=$(git tag --list | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | grep -v "homolog" | sort -V | tail -n1)
echo "Última tag de develop: $LATEST_DEVELOP_TAG"
echo ""

# Encontrar última tag de homolog
LATEST_HOMOLOG_TAG=$(git tag --list "*homolog*" | sort -V | tail -n1)
echo "Última tag de homolog: $LATEST_HOMOLOG_TAG"
echo ""

# Encontrar última tag de produção
LATEST_MAIN_TAG=$(git tag --list | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | grep -v "homolog" | sort -V | tail -n1)
echo "Última tag de produção: $LATEST_MAIN_TAG"
echo ""

# Verificar tags especiais
echo "🏷️  Tags especiais:"
if git tag --list | grep -q "^homolog$"; then
    HOMOLOG_POINTS_TO=$(git rev-parse homolog 2>/dev/null || echo "N/A")
    echo "Tag 'homolog' -> $HOMOLOG_POINTS_TO"
else
    echo "Tag 'homolog' -> Não existe"
fi

if git tag --list | grep -q "^latest$"; then
    LATEST_POINTS_TO=$(git rev-parse latest 2>/dev/null || echo "N/A")
    echo "Tag 'latest' -> $LATEST_POINTS_TO"
else
    echo "Tag 'latest' -> Não existe"
fi
echo ""

# Verificar se há tags duplicadas ou conflitantes
echo "⚠️  Verificando possíveis conflitos..."
DUPLICATE_TAGS=$(git tag --list | sort | uniq -d)
if [ -n "$DUPLICATE_TAGS" ]; then
    echo "❌ Tags duplicadas encontradas:"
    echo "$DUPLICATE_TAGS"
else
    echo "✅ Nenhuma tag duplicada encontrada"
fi
echo ""

# Verificar tags que podem causar conflito baseado no branch atual
if [ "$CURRENT_BRANCH" = "homolog" ] && [ -n "$LATEST_DEVELOP_TAG" ]; then
    BASE_VERSION=${LATEST_DEVELOP_TAG#v}
    POTENTIAL_HOMOLOG_TAG="v${BASE_VERSION}-homolog"
    
    if git tag --list | grep -q "^$POTENTIAL_HOMOLOG_TAG$"; then
        echo "⚠️  Tag potencial de homolog já existe: $POTENTIAL_HOMOLOG_TAG"
        echo "   Isso pode causar conflito no semantic-release"
    else
        echo "✅ Tag potencial de homolog não existe: $POTENTIAL_HOMOLOG_TAG"
    fi
fi

if [ "$CURRENT_BRANCH" = "main" ] && [ -n "$LATEST_DEVELOP_TAG" ]; then
    if git tag --list | grep -q "^$LATEST_DEVELOP_TAG$"; then
        echo "⚠️  Tag de develop já existe como tag de produção: $LATEST_DEVELOP_TAG"
        echo "   Isso pode causar conflito no semantic-release"
    else
        echo "✅ Tag de develop não existe como tag de produção: $LATEST_DEVELOP_TAG"
    fi
fi
echo ""

echo "✅ Verificação concluída!"
echo ""
echo "Se houver conflitos, use:"
echo "  ./scripts/clean-specific-tag.sh <tag_name>"
echo "  ./scripts/clean-problematic-tags.sh" 