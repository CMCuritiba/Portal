#!/bin/bash

# Script para criar GitHub Releases usando a API diretamente
# Uso: ./scripts/create-github-release-api.sh <tag_name> <release_type> <base_tag>
# Exemplo: ./scripts/create-github-release-api.sh v1.1.22-homolog prerelease v1.1.22

set -e

if [ $# -lt 3 ]; then
    echo "❌ Erro: Argumentos insuficientes"
    echo "Uso: $0 <tag_name> <release_type> <base_tag>"
    echo "  <tag_name>: Nome da tag (ex: v1.1.22-homolog)"
    echo "  <release_type>: 'release' ou 'prerelease'"
    echo "  <base_tag>: Tag base para copiar conteúdo (ex: v1.1.22)"
    exit 1
fi

TAG_NAME="$1"
RELEASE_TYPE="$2"
BASE_TAG="$3"

echo "🚀 Criando GitHub Release via API..."
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

# Escapar caracteres especiais para JSON (sem usar jq)
RELEASE_NOTES_JSON=$(echo "$RELEASE_NOTES" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g' | sed ':a;N;$!ba;s/\n/\\n/g')
RELEASE_NOTES_JSON="\"$RELEASE_NOTES_JSON\""

# Determinar se é prerelease
if [ "$RELEASE_TYPE" = "prerelease" ]; then
    PRERELEASE="true"
else
    PRERELEASE="false"
fi

# Obter informações do repositório
REPO_URL=$(git config --get remote.origin.url)
REPO_OWNER=$(echo "$REPO_URL" | sed 's/.*github.com[:/]\([^/]*\)\/\([^/]*\).*/\1/')
REPO_NAME=$(echo "$REPO_URL" | sed 's/.*github.com[:/]\([^/]*\)\/\([^/]*\).*/\2/' | sed 's/\.git$//')

# Verificar se a tag existe
if ! git tag --list | grep -q "^$TAG_NAME$"; then
    echo "❌ Erro: Tag $TAG_NAME não existe"
    echo "Tags disponíveis:"
    git tag --list | sort -V
    exit 1
fi

echo "📋 Criando release via API..."
echo "Repositório: $REPO_OWNER/$REPO_NAME"
echo "Tag: $TAG_NAME"
echo "Prerelease: $PRERELEASE"

# Verificar se já existe um release para esta tag
echo "📋 Verificando se já existe release para $TAG_NAME..."
EXISTING_RELEASE=$(curl -s -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases/tags/$TAG_NAME" 2>/dev/null || echo "")

if [ -n "$EXISTING_RELEASE" ] && ! echo "$EXISTING_RELEASE" | grep -q '"message":"Not Found"'; then
    echo "⚠️  Release já existe para $TAG_NAME. Atualizando..."
    
    # Atualizar release existente
    RESPONSE=$(curl -s -w "\n%{http_code}" -X PATCH \
      -H "Accept: application/vnd.github.v3+json" \
      -H "Authorization: token $GITHUB_TOKEN" \
      -H "Content-Type: application/json" \
      "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases/tags/$TAG_NAME" \
      -d "{
        \"name\": \"Release $TAG_NAME\",
        \"body\": $RELEASE_NOTES_JSON,
        \"prerelease\": $PRERELEASE
      }")
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    RESPONSE_BODY=$(echo "$RESPONSE" | head -n -1)
    
    if [ "$HTTP_CODE" = "200" ]; then
      echo "✅ Release atualizado com sucesso!"
    else
      echo "❌ Erro ao atualizar release (HTTP $HTTP_CODE):"
      echo "$RESPONSE_BODY"
      exit 1
    fi
else
    echo "🔄 Criando novo release..."

# Verificar se a tag existe
echo "📋 Verificando se a tag $TAG_NAME existe..."
if ! git tag --list | grep -q "^$TAG_NAME$"; then
  echo "❌ Erro: Tag $TAG_NAME não existe localmente"
  echo "📋 Tags disponíveis:"
  git tag --list | sort -V
  exit 1
fi

echo "✅ Tag $TAG_NAME existe"

# Obter o branch atual
CURRENT_BRANCH=$(git branch --show-current)
echo "📋 Branch atual: $CURRENT_BRANCH"

# Criar release via API sem especificar target_commitish (usar padrão)
echo "📋 Enviando requisição para API do GitHub..."
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases" \
  -d "{
    \"tag_name\": \"$TAG_NAME\",
    \"name\": \"Release $TAG_NAME\",
    \"body\": $RELEASE_NOTES_JSON,
    \"prerelease\": $PRERELEASE
  }")

# Separar resposta e código HTTP
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$RESPONSE" | head -n -1)

if [ "$HTTP_CODE" = "201" ]; then
  echo "✅ Release criado com sucesso!"
else
  echo "❌ Erro ao criar release (HTTP $HTTP_CODE):"
  echo "$RESPONSE_BODY"
  exit 1
fi
fi

echo ""
echo "✅ GitHub Release criado via API!"
echo "📋 Release: https://github.com/$REPO_OWNER/$REPO_NAME/releases/tag/$TAG_NAME" 