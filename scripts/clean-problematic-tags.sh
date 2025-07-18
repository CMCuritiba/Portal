#!/bin/bash

# Script para limpar tags problemáticas que estão causando conflito
# Uso: ./scripts/clean-problematic-tags.sh

set -e

echo "🧹 Limpando tags problemáticas..."
echo ""

# Verificar se estamos em um branch válido
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" != "develop" && "$CURRENT_BRANCH" != "homolog" && "$CURRENT_BRANCH" != "main" && ! "$CURRENT_BRANCH" =~ ^hotfix/ ]]; then
    echo "Erro: Este script deve ser executado em develop, homolog, main ou hotfix/*"
    echo "Branch atual: $CURRENT_BRANCH"
    exit 1
fi

echo "1. Verificando tags problemáticas..."
echo "Tags atuais:"
git tag --list | grep -E "^(homolog|latest)$" || echo "Nenhuma tag problemática encontrada"

echo ""
echo "2. Removendo tags problemáticas localmente..."
git tag -d homolog 2>/dev/null || echo "Tag homolog não existe localmente"
git tag -d latest 2>/dev/null || echo "Tag latest não existe localmente"

echo ""
echo "3. Removendo tags problemáticas do repositório remoto..."
git push origin :refs/tags/homolog 2>/dev/null || echo "Tag homolog não existe no remoto"
git push origin :refs/tags/latest 2>/dev/null || echo "Tag latest não existe no remoto"

echo ""
echo "4. Verificando se as tags foram removidas..."
echo "Tags restantes:"
git tag --list | grep -E "^(homolog|latest)$" || echo "✅ Tags problemáticas removidas com sucesso"

echo ""
echo "✅ Script executado com sucesso!"
echo ""
echo "Agora o semantic-release deve funcionar corretamente."
echo "As tags 'homolog' e 'latest' serão recriadas automaticamente pelo workflow."
echo ""
echo "Próximos passos:"
echo "1. Faça push para o branch desejado"
echo "2. O workflow criará as tags automaticamente"
echo "3. As tags serão gerenciadas pelo semantic-release" 