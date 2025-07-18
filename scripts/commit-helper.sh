#!/bin/bash

# Script para ajudar com commits seguindo Conventional Commits
# Uso: ./scripts/commit-helper.sh

set -e

echo "🤖 Commit Helper - Conventional Commits"
echo "========================================"
echo ""

# Função para mostrar tipos de commit
show_commit_types() {
    echo "📋 Tipos de Commit:"
    echo "  feat     - Nova funcionalidade (MINOR)"
    echo "  fix      - Correção de bug (PATCH)"
    echo "  refactor - Refatoração (PATCH)"
    echo "  perf     - Melhoria de performance (PATCH)"
    echo "  docs     - Documentação (não afeta versão)"
    echo "  style    - Formatação (não afeta versão)"
    echo "  test     - Testes (não afeta versão)"
    echo "  chore    - Manutenção (não afeta versão)"
    echo "  ci       - CI/CD (não afeta versão)"
    echo "  build    - Build (pode gerar nova versão de build)"
    echo ""
}

# Função para mostrar exemplos
show_examples() {
    echo "📝 Exemplos:"
    echo "  feat(auth): add OAuth2 authentication"
    echo "  fix(login): correct password validation"
    echo "  refactor(api): improve error handling"
    echo "  perf(database): optimize query performance"
    echo "  docs(readme): update installation guide"
    echo "  style(components): format code with prettier"
    echo "  test(auth): add unit tests for login"
    echo "  chore(deps): update axios to v1.0.0"
    echo "  ci(workflow): add semantic-release"
    echo "  build(docker): update base image"
    echo ""
}

# Função para mostrar breaking changes
show_breaking_changes() {
    echo "⚠️  Breaking Changes:"
    echo "  feat(api): redesign authentication endpoints"
    echo ""
    echo "  BREAKING CHANGE: remove deprecated /auth/v1 endpoints"
    echo ""
}

# Função para capturar input do usuário
get_commit_info() {
    echo "Escolha o tipo de commit:"
    read -p "Tipo (feat/fix/refactor/perf/docs/style/test/chore/ci/build): " commit_type
    
    echo ""
    echo "Escolha o escopo (opcional):"
    read -p "Escopo (ex: auth, login, api): " scope
    
    echo ""
    echo "Descreva a mudança:"
    read -p "Descrição: " description
    
    echo ""
    echo "Há breaking changes? (y/N): "
    read -p "Breaking change: " breaking_change
    
    # Construir mensagem de commit
    if [ -n "$scope" ]; then
        commit_message="$commit_type($scope): $description"
    else
        commit_message="$commit_type: $description"
    fi
    
    # Adicionar breaking change se necessário
    if [ "$breaking_change" = "y" ] || [ "$breaking_change" = "Y" ]; then
        echo ""
        echo "Descreva o breaking change:"
        read -p "Breaking change description: " breaking_description
        commit_message="$commit_message

BREAKING CHANGE: $breaking_description"
    fi
    
    echo ""
    echo "📤 Commit message:"
    echo "=================="
    echo "$commit_message"
    echo "=================="
    echo ""
    
    echo "Confirmar commit? (y/N): "
    read -p "Confirmar: " confirm
    
    if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
        git commit -m "$commit_message"
        echo "✅ Commit realizado com sucesso!"
    else
        echo "❌ Commit cancelado"
    fi
}

# Menu principal
while true; do
    echo "Escolha uma opção:"
    echo "1. Ver tipos de commit"
    echo "2. Ver exemplos"
    echo "3. Ver breaking changes"
    echo "4. Fazer commit"
    echo "5. Sair"
    echo ""
    read -p "Opção: " option
    
    case $option in
        1)
            show_commit_types
            ;;
        2)
            show_examples
            ;;
        3)
            show_breaking_changes
            ;;
        4)
            get_commit_info
            ;;
        5)
            echo "👋 Até logo!"
            exit 0
            ;;
        *)
            echo "❌ Opção inválida"
            echo ""
            ;;
    esac
done 