#!/bin/bash

# Script de teste para GitHub Release
# Uso: ./scripts/test-github-release.sh <tag_name>

set -e

if [ $# -lt 1 ]; then
    echo "❌ Erro: Tag não fornecida"
    echo "Uso: $0 <tag_name>"
    echo "Exemplo: $0 v1.1.26-homolog"
    exit 1
fi

TAG_NAME="$1"

echo "🧪 Testando criação de GitHub Release..."
echo "Tag: $TAG_NAME"
echo ""

# Verificar se a tag existe
echo "📋 Verificando se a tag existe..."
if git tag --list | grep -q "^$TAG_NAME$"; then
    echo "✅ Tag $TAG_NAME existe"
else
    echo "❌ Tag $TAG_NAME não existe"
    echo "Tags disponíveis:"
    git tag --list | sort -V
    exit 1
fi

# Obter informações do repositório
REPO_URL=$(git config --get remote.origin.url)
REPO_OWNER=$(echo "$REPO_URL" | sed 's/.*github.com[:/]\([^/]*\)\/\([^/]*\).*/\1/')
REPO_NAME=$(echo "$REPO_URL" | sed 's/.*github.com[:/]\([^/]*\)\/\([^/]*\).*/\2/' | sed 's/\.git$//')

echo "📋 Repositório: $REPO_OWNER/$REPO_NAME"

# Testar API do GitHub
echo "📋 Testando API do GitHub..."
TEST_RESPONSE=$(curl -s -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME")

# Verificar se a resposta contém erro de autenticação
if echo "$TEST_RESPONSE" | grep -q '"message":"Bad credentials"'; then
    echo "❌ Erro de autenticação com GitHub API"
    echo "📋 Verificando se GITHUB_TOKEN está definido..."
    if [ -z "$GITHUB_TOKEN" ]; then
        echo "❌ GITHUB_TOKEN não está definido"
    else
        echo "⚠️  GITHUB_TOKEN está definido, mas pode não ter permissões suficientes"
        echo "📋 Token (primeiros 10 caracteres): ${GITHUB_TOKEN:0:10}..."
    fi
    exit 1
elif [ $? -eq 0 ]; then
    echo "✅ API do GitHub acessível"
else
    echo "❌ Erro ao acessar API do GitHub"
    exit 1
fi

# Verificar se já existe release para esta tag
echo "📋 Verificando se já existe release para $TAG_NAME..."
EXISTING_RELEASE=$(curl -s -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases/tags/$TAG_NAME")

# Verificar se a resposta contém "Not Found" (sem usar jq)
if [ -n "$EXISTING_RELEASE" ] && ! echo "$EXISTING_RELEASE" | grep -q '"message":"Not Found"'; then
    echo "⚠️  Release já existe para $TAG_NAME"
    echo "📋 Detalhes do release existente:"
    echo "$EXISTING_RELEASE"
else
    echo "✅ Nenhum release existente para $TAG_NAME"
fi

echo ""
echo "✅ Teste concluído!" 