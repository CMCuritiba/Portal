#!/bin/bash

# Script para criar hotfix seguindo a política de versionamento
# Uso: ./scripts/create-hotfix.sh <descrição-do-hotfix>

set -e

if [ $# -eq 0 ]; then
    echo "Erro: Descrição do hotfix é obrigatória"
    echo "Uso: $0 <descrição-do-hotfix>"
    echo "Exemplo: $0 'fix-login-security-vulnerability'"
    exit 1
fi

DESCRIPTION=$1
CLEAN_DESCRIPTION=$(echo "$DESCRIPTION" | tr ' ' '-' | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]//g')
BRANCH_NAME="hotfix/$CLEAN_DESCRIPTION"

echo "Criando hotfix: $BRANCH_NAME"
echo "Descrição: $DESCRIPTION"

# Verificar se estamos no branch main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "Erro: Hotfix deve ser criado a partir do branch main"
    echo "Branch atual: $CURRENT_BRANCH"
    echo "Por favor, faça checkout para main primeiro:"
    echo "  git checkout main"
    echo "  git pull origin main"
    exit 1
fi

# Verificar se há mudanças não commitadas
if [ -n "$(git status --porcelain)" ]; then
    echo "Erro: Há mudanças não commitadas no repositório"
    echo "Por favor, commit ou stash suas mudanças antes de criar o hotfix"
    exit 1
fi

# Atualizar main
echo "Atualizando branch main..."
git pull origin main

# Criar branch do hotfix
echo "Criando branch: $BRANCH_NAME"
git checkout -b "$BRANCH_NAME"

echo ""
echo "✅ Hotfix criado com sucesso!"
echo ""
echo "Próximos passos:"
echo "1. Faça as correções necessárias"
echo "2. Commit seguindo Conventional Commits:"
echo "   git commit -m 'fix(componente): descrição da correção'"
echo "3. Push do branch:"
echo "   git push origin $BRANCH_NAME"
echo "4. Crie um Pull Request para main"
echo "5. Após aprovação e merge, o semantic-release criará automaticamente:"
echo "   - Nova versão PATCH (ex: 1.0.0 → 1.0.1)"
echo "   - Release no GitHub"
echo "   - Tag 'latest' atualizada"
echo "   - Build das imagens Docker"
echo ""
echo "⚠️  Lembre-se:"
echo "- Hotfixes devem ser correções críticas e urgentes"
echo "- Evite breaking changes em hotfixes"
echo "- Teste rigorosamente antes do merge"
echo "- Após o merge em main, faça merge em develop para sincronizar" 