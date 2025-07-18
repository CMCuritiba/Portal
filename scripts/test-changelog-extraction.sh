#!/bin/bash

# Script para testar extração do changelog
# Uso: ./scripts/test-changelog-extraction.sh <base_tag>
# Exemplo: ./scripts/test-changelog-extraction.sh v1.1.26

set -e

if [ $# -lt 1 ]; then
    echo "❌ Erro: Tag base não fornecida"
    echo "Uso: $0 <base_tag>"
    echo "Exemplo: $0 v1.1.26"
    exit 1
fi

BASE_TAG="$1"

echo "🧪 Testando extração do changelog..."
echo "Tag base: $BASE_TAG"
echo ""

# Verificar se CHANGELOG.md existe
if [ ! -f "CHANGELOG.md" ]; then
    echo "❌ CHANGELOG.md não encontrado"
    exit 1
fi

echo "✅ CHANGELOG.md encontrado"
echo ""

# Verificar se a versão existe no changelog (com formato com data)
BASE_VERSION_NUM=${BASE_TAG#v}  # Remove o 'v' do início
echo "📋 Verificando se $BASE_VERSION_NUM existe no changelog..."
if grep -q "^## \[$BASE_VERSION_NUM\]" CHANGELOG.md; then
    echo "✅ Versão $BASE_VERSION_NUM encontrada no changelog"
else
    echo "⚠️  Versão $BASE_VERSION_NUM não encontrada no changelog"
    echo "📋 Versões disponíveis no changelog:"
    grep "^## \[[0-9]" CHANGELOG.md | head -10
    echo ""
    
    # Tentar usar a versão mais recente do changelog
    LATEST_CHANGELOG_VERSION=$(grep "^## \[[0-9]" CHANGELOG.md | head -1 | sed 's/^## \[\([^]]*\)\].*/\1/')
    if [ -n "$LATEST_CHANGELOG_VERSION" ]; then
        echo "📋 Versão mais recente do changelog: $LATEST_CHANGELOG_VERSION"
        BASE_VERSION_NUM="$LATEST_CHANGELOG_VERSION"
    else
        echo "❌ Nenhuma versão encontrada no changelog"
        exit 1
    fi
fi

echo ""

# Extrair conteúdo do changelog
echo "📋 Extraindo conteúdo para $BASE_VERSION_NUM..."
CHANGELOG_CONTENT=$(awk -v version="$BASE_VERSION_NUM" '
    /^## \['"$BASE_VERSION_NUM"'\]/ { 
        in_section = 1
        print
        next
    }
    /^## \[/ && in_section { 
        in_section = 0
        exit
    }
    in_section { 
        print
    }
' CHANGELOG.md)

if [ -n "$CHANGELOG_CONTENT" ]; then
    echo "✅ Conteúdo extraído com sucesso!"
    echo ""
    echo "📋 Conteúdo extraído:"
    echo "---"
    echo "$CHANGELOG_CONTENT"
    echo "---"
else
    echo "❌ Falha ao extrair conteúdo do changelog"
    exit 1
fi

echo ""
echo "✅ Teste de extração concluído!" 