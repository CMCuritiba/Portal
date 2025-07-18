#!/bin/bash

# Script para criar GitHub Releases
# Uso: ./scripts/create-github-release.sh <tag_name> <release_type> [base_tag]
# Exemplo: ./scripts/create-github-release.sh v1.1.22-homolog prerelease v1.1.22
# Exemplo: ./scripts/create-github-release.sh v1.1.22 release v1.1.22

set -e

if [ $# -lt 3 ]; then
    echo "❌ Erro: Argumentos insuficientes"
    echo "Uso: $0 <tag_name> <release_type> <base_tag>"
    echo "  <tag_name>: Nome da tag (ex: v1.1.22-homolog)"
    echo "  <release_type>: 'release' ou 'prerelease'"
    echo "  <base_tag>: Tag base para copiar conteúdo (ex: v1.1.22)"
    echo ""
    echo "Exemplos:"
    echo "  $0 v1.1.22-homolog prerelease v1.1.22"
    echo "  $0 v1.1.22 release v1.1.22"
    exit 1
fi

TAG_NAME="$1"
RELEASE_TYPE="$2"
BASE_TAG="$3"

echo "🚀 Criando GitHub Release..."
echo "Tag: $TAG_NAME"
echo "Tipo: $RELEASE_TYPE"
echo "Tag base: $BASE_TAG"
echo ""

# Obter conteúdo do changelog da tag base
echo "📋 Obtendo conteúdo do changelog da tag base..."
if [ -f "CHANGELOG.md" ]; then
    # Extrair seção do changelog para a versão base
    CHANGELOG_CONTENT=$(awk -v version="$BASE_TAG" '
        /^## \['"$BASE_TAG"'\]/ { 
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
        echo "✅ Conteúdo do changelog encontrado para $BASE_TAG"
        RELEASE_NOTES="$CHANGELOG_CONTENT"
    else
        echo "⚠️  Conteúdo do changelog não encontrado para $BASE_TAG, usando padrão"
        RELEASE_NOTES="Release $TAG_NAME based on $BASE_TAG"
    fi
else
    echo "⚠️  CHANGELOG.md não encontrado, usando padrão"
    RELEASE_NOTES="Release $TAG_NAME based on $BASE_TAG"
fi

echo "Conteúdo do release:"
echo "$RELEASE_NOTES"
echo ""

# Verificar se a tag existe
if ! git tag --list | grep -q "^$TAG_NAME$"; then
    echo "❌ Erro: Tag $TAG_NAME não existe"
    exit 1
fi

# Verificar tipo de release
if [ "$RELEASE_TYPE" != "release" ] && [ "$RELEASE_TYPE" != "prerelease" ]; then
    echo "❌ Erro: Tipo de release deve ser 'release' ou 'prerelease'"
    exit 1
fi

# Verificar se já existe um release para esta tag
if gh release view "$TAG_NAME" >/dev/null 2>&1; then
    echo "⚠️  Release já existe para $TAG_NAME. Atualizando..."
    
    if [ "$RELEASE_TYPE" = "prerelease" ]; then
        gh release edit "$TAG_NAME" \
          --title "Release $TAG_NAME" \
          --notes "$RELEASE_NOTES" \
          --prerelease
    else
        gh release edit "$TAG_NAME" \
          --title "Release $TAG_NAME" \
          --notes "$RELEASE_NOTES"
    fi
    
    echo "✅ Release atualizado para $TAG_NAME"
else
    echo "🔄 Criando novo release..."
    
    if [ "$RELEASE_TYPE" = "prerelease" ]; then
        gh release create "$TAG_NAME" \
          --title "Release $TAG_NAME" \
          --notes "$RELEASE_NOTES" \
          --prerelease \
          --target "$TAG_NAME"
    else
        gh release create "$TAG_NAME" \
          --title "Release $TAG_NAME" \
          --notes "$RELEASE_NOTES" \
          --target "$TAG_NAME"
    fi
    
    echo "✅ Release criado para $TAG_NAME"
fi

echo ""
echo "✅ GitHub Release processado com sucesso!"
echo "📋 Release: https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^/]*\/[^/]*\).*/\1/')/releases/tag/$TAG_NAME" 