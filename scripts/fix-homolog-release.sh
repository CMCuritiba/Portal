#!/bin/bash

# Script para resolver o problema atual do homolog
# Uso: ./scripts/fix-homolog-release.sh

set -e

echo "🔧 Fixando release de homolog..."
echo ""

# Verificar se estamos no branch homolog
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "homolog" ]; then
    echo "Erro: Este script deve ser executado no branch homolog"
    echo "Branch atual: $CURRENT_BRANCH"
    echo "Por favor, faça checkout para homolog primeiro:"
    echo "  git checkout homolog"
    exit 1
fi

# Verificar se há mudanças não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo "Erro: Há mudanças não commitadas no repositório"
    echo "Por favor, commit ou stash suas mudanças antes de executar este script"
    exit 1
fi

echo "1. Removendo tags conflitantes..."
# Remover tag homolog se existir
git tag -d homolog 2>/dev/null || true
git push origin :refs/tags/homolog 2>/dev/null || true

echo "2. Criando commit de força..."
git commit --allow-empty -m "chore: force homolog release

Forçar criação de release de homolog devido a merges de PRs.

[skip ci]"

echo "3. Push do commit..."
git push origin homolog

echo ""
echo "✅ Script executado com sucesso!"
echo ""
echo "O workflow agora deve:"
echo "1. Detectar o commit de força"
echo "2. Criar a release de homolog"
echo "3. Atualizar a tag 'homolog'"
echo "4. Gerar as imagens Docker"
echo ""
echo "Verifique o progresso em:"
echo "https://github.com/CMCuritiba/Portal/actions" 