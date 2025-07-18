#!/bin/bash

# Script para forçar a criação de uma release quando o semantic-release não detecta mudanças
# Uso: ./scripts/force-release.sh <tipo> <descrição>
# Exemplo: ./scripts/force-release.sh patch "Forçar release de homolog"

set -e

if [ $# -lt 2 ]; then
    echo "Erro: Tipo e descrição são obrigatórios"
    echo "Uso: $0 <tipo> <descrição>"
    echo "Tipos: patch, minor, major"
    echo "Exemplo: $0 patch 'Forçar release de homolog'"
    exit 1
fi

RELEASE_TYPE=$1
DESCRIPTION=$2

echo "🚀 Forçando release: $RELEASE_TYPE"
echo "Descrição: $DESCRIPTION"
echo ""

# Verificar se estamos em um branch válido
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" != "develop" && "$CURRENT_BRANCH" != "homolog" && "$CURRENT_BRANCH" != "main" && ! "$CURRENT_BRANCH" =~ ^hotfix/ ]]; then
    echo "Erro: Este script deve ser executado em develop, homolog, main ou hotfix/*"
    echo "Branch atual: $CURRENT_BRANCH"
    exit 1
fi

# Verificar se há mudanças não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo "Erro: Há mudanças não commitadas no repositório"
    echo "Por favor, commit ou stash suas mudanças antes de forçar a release"
    exit 1
fi

# Criar commit de força
echo "Criando commit de força..."
git commit --allow-empty -m "chore: force $RELEASE_TYPE release

$DESCRIPTION

[skip ci]"

echo ""
echo "✅ Commit de força criado!"
echo ""
echo "Próximos passos:"
echo "1. Push do branch:"
echo "   git push origin $CURRENT_BRANCH"
echo ""
echo "2. O semantic-release detectará o commit e criará a release automaticamente"
echo ""
echo "⚠️  Lembre-se:"
echo "- Use este script apenas quando necessário"
echo "- O commit será incluído no changelog"
echo "- A release será criada automaticamente pelo workflow" 