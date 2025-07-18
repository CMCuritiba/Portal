#!/bin/bash

# Script para testar autenticação do GitHub
# Uso: ./scripts/test-github-auth.sh

set -e

echo "🔐 Testando autenticação do GitHub..."
echo ""

# Verificar se GITHUB_TOKEN está definido
echo "📋 Verificando GITHUB_TOKEN..."
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN não está definido"
    echo "📋 Variáveis de ambiente disponíveis:"
    env | grep -i github || echo "Nenhuma variável GitHub encontrada"
    exit 1
else
    echo "✅ GITHUB_TOKEN está definido"
    echo "📋 Token (primeiros 10 caracteres): ${GITHUB_TOKEN:0:10}..."
fi

# Obter informações do repositório
REPO_URL=$(git config --get remote.origin.url)
REPO_OWNER=$(echo "$REPO_URL" | sed 's/.*github.com[:/]\([^/]*\)\/\([^/]*\).*/\1/')
REPO_NAME=$(echo "$REPO_URL" | sed 's/.*github.com[:/]\([^/]*\)\/\([^/]*\).*/\2/' | sed 's/\.git$//')

echo "📋 Repositório: $REPO_OWNER/$REPO_NAME"
echo ""

# Testar API do GitHub
echo "📋 Testando API do GitHub..."
RESPONSE=$(curl -s -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME")

# Verificar se a resposta contém erro de autenticação
if echo "$RESPONSE" | grep -q '"message":"Bad credentials"'; then
    echo "❌ Erro de autenticação com GitHub API"
    echo "📋 Resposta completa:"
    echo "$RESPONSE"
    exit 1
elif echo "$RESPONSE" | grep -q '"message":"Not Found"'; then
    echo "❌ Repositório não encontrado ou sem acesso"
    echo "📋 Resposta completa:"
    echo "$RESPONSE"
    exit 1
else
    echo "✅ API do GitHub acessível"
    echo "📋 Repositório encontrado:"
    echo "$RESPONSE" | grep -o '"name":"[^"]*"' | head -1
fi

echo ""
echo "✅ Autenticação do GitHub funcionando!" 