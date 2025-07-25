#!/bin/bash

# Script para testar o workflow localmente
echo "🚀 Testando workflow localmente..."

# Configurar variáveis de ambiente
export GH_TOKEN="test-token"
export GITHUB_TOKEN="test-token"

# Verificar se estamos na branch test
CURRENT_BRANCH=$(git branch --show-current)
echo "📋 Branch atual: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "test" ]; then
    echo "⚠️ Você não está na branch test. Mude para a branch test primeiro:"
    echo "git checkout test"
    exit 1
fi

# Instalar uv se não estiver instalado
if ! command -v uv &> /dev/null; then
    echo "📦 Instalando uv..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    export PATH="$HOME/.local/bin:$PATH"
fi

# Adicionar uv ao PATH
export PATH="$HOME/.local/bin:$PATH"
echo "🔧 PATH atualizado: $PATH"
echo "🔧 uv disponível: $(which uv 2>/dev/null || echo 'não encontrado')"
echo "🔧 uvx disponível: $(which uvx 2>/dev/null || echo 'não encontrado')"

# Instalar RepoPlone
echo "📦 Instalando RepoPlone..."
uvx repoplone --version

# Configurar Git
git config --global user.name 'test-user'
git config --global user.email 'test@example.com'

echo "🔍 Analisando commits para determinar tipo de incremento..."
echo "📋 Tipos de Conventional Commits suportados:"
echo "   • feat: Nova funcionalidade (MINOR)"
echo "   • fix: Correção de bug (PATCH)"
echo "   • refactor: Refatoração sem mudança de comportamento (PATCH)"
echo "   • perf: Melhoria de performance (PATCH)"
echo "   • build: Alterações no build (PATCH)"
echo "   • BREAKING CHANGE: Mudança incompatível (MAJOR)"
echo "   • chore/docs/style/test/ci/revert: Não afetam versionamento"

# Obter commits desde a última tag
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")

if [ -n "$LAST_TAG" ]; then
    echo "Última tag: $LAST_TAG"
    COMMITS=$(git log --oneline $LAST_TAG..HEAD)
else
    echo "Nenhuma tag encontrada, analisando todos os commits"
    COMMITS=$(git log --oneline)
fi

echo "Commits analisados:"
echo "$COMMITS"

echo "🔍 Analisando padrões nos commits..."
echo "Commits com 'fix:': $(echo "$COMMITS" | grep -c "fix:")"
echo "Commits com 'feat:': $(echo "$COMMITS" | grep -c "feat:")"
echo "Commits com 'refactor:': $(echo "$COMMITS" | grep -c "refactor:")"
echo "Commits com 'perf:': $(echo "$COMMITS" | grep -c "perf:")"
echo "Commits com 'build:': $(echo "$COMMITS" | grep -c "build:")"
echo "Commits com 'BREAKING': $(echo "$COMMITS" | grep -c "BREAKING")"

# Mostrar commits que contêm cada tipo
echo "Commits que contêm 'fix':"
echo "$COMMITS" | grep "fix" || echo "Nenhum commit com 'fix' encontrado"

echo "Commits que contêm 'feat':"
echo "$COMMITS" | grep "feat" || echo "Nenhum commit com 'feat' encontrado"

echo "Commits que contêm 'refactor':"
echo "$COMMITS" | grep "refactor" || echo "Nenhum commit com 'refactor' encontrado"

echo "Commits que contêm 'perf':"
echo "$COMMITS" | grep "perf" || echo "Nenhum commit com 'perf' encontrado"

echo "Commits que contêm 'build':"
echo "$COMMITS" | grep "build" || echo "Nenhum commit com 'build' encontrado"

# Determinar tipo de incremento baseado nos commits
VERSION_BUMP="patch"  # padrão

if echo "$COMMITS" | grep -q "BREAKING CHANGE\|!:"; then
    VERSION_BUMP="major"
    echo "🔴 Breaking change detectado - MAJOR increment"
elif echo "$COMMITS" | grep -q "feat:"; then
    VERSION_BUMP="minor"
    echo "🟡 Feature detectada - MINOR increment"
elif echo "$COMMITS" | grep -q "fix:\|refactor:\|perf:"; then
    VERSION_BUMP="patch"
    echo "🟢 Fix/Refactor/Perf detectado - PATCH increment"
elif echo "$COMMITS" | grep -q "build:"; then
    VERSION_BUMP="patch"
    echo "🔧 Build detectado - PATCH increment (pode afetar versão de build)"
else
    echo "⚪ Nenhum tipo específico detectado - PATCH increment (padrão)"
fi

echo "Tipo de incremento: $VERSION_BUMP"
echo "DEBUG: VERSION_BUMP length = ${#VERSION_BUMP}"
echo "DEBUG: VERSION_BUMP value = '$VERSION_BUMP'"

echo "📝 Criando fragments baseado nos commits..."

# Criar diretórios para fragments baseado na configuração do Towncrier
# RepoPlone usa o backend como principal, então criamos fragments lá
mkdir -p backend/news/breaking backend/news/feature backend/news/bugfix backend/news/internal backend/news/documentation

# Também criar fragments para o repositório base (monorepo)
mkdir -p news/breaking news/feature news/bugfix news/internal news/documentation

# Contador para fragments
FRAGMENT_COUNT=1

# Processar cada commit e criar fragments
echo "$COMMITS" | while IFS= read -r commit; do
    if echo "$commit" | grep -q "BREAKING CHANGE\|!:"; then
        echo "🔴 Criando fragment para breaking: $commit"
        echo "$commit" > "backend/news/breaking/$(printf "%03d" $FRAGMENT_COUNT)-breaking.md"
        echo "$commit" > "news/breaking/$(printf "%03d" $FRAGMENT_COUNT)-breaking.md"
        FRAGMENT_COUNT=$((FRAGMENT_COUNT + 1))
    elif echo "$commit" | grep -q "feat:"; then
        echo "🟡 Criando fragment para feature: $commit"
        echo "$commit" > "backend/news/feature/$(printf "%03d" $FRAGMENT_COUNT)-feature.md"
        echo "$commit" > "news/feature/$(printf "%03d" $FRAGMENT_COUNT)-feature.md"
        FRAGMENT_COUNT=$((FRAGMENT_COUNT + 1))
    elif echo "$commit" | grep -q "fix:"; then
        echo "🟢 Criando fragment para bugfix: $commit"
        echo "$commit" > "backend/news/bugfix/$(printf "%03d" $FRAGMENT_COUNT)-bugfix.md"
        echo "$commit" > "news/bugfix/$(printf "%03d" $FRAGMENT_COUNT)-bugfix.md"
        FRAGMENT_COUNT=$((FRAGMENT_COUNT + 1))
    elif echo "$commit" | grep -q "refactor:\|perf:\|build:"; then
        echo "🔧 Criando fragment para internal: $commit"
        echo "$commit" > "backend/news/internal/$(printf "%03d" $FRAGMENT_COUNT)-internal.md"
        echo "$commit" > "news/internal/$(printf "%03d" $FRAGMENT_COUNT)-internal.md"
        FRAGMENT_COUNT=$((FRAGMENT_COUNT + 1))
    elif echo "$commit" | grep -q "docs:"; then
        echo "📚 Criando fragment para documentation: $commit"
        echo "$commit" > "backend/news/documentation/$(printf "%03d" $FRAGMENT_COUNT)-documentation.md"
        echo "$commit" > "news/documentation/$(printf "%03d" $FRAGMENT_COUNT)-documentation.md"
        FRAGMENT_COUNT=$((FRAGMENT_COUNT + 1))
    fi
done

# Se não criou nenhum fragment, criar um padrão
if [ ! -f "backend/news/feature/001-feature.md" ] && [ ! -f "backend/news/bugfix/001-bugfix.md" ] && [ ! -f "backend/news/breaking/001-breaking.md" ] && [ ! -f "backend/news/internal/001-internal.md" ] && [ ! -f "backend/news/documentation/001-documentation.md" ]; then
    echo "⚠️ Nenhum commit convencional encontrado, criando fragment padrão..."
    mkdir -p backend/news/feature
    echo "Atualização de versão automática" > backend/news/feature/001-version-update.md
    mkdir -p news/feature
    echo "Atualização de versão automática" > news/feature/001-version-update.md
fi

echo "📋 Fragments criados no backend:"
find backend/news -name "*.md" -type f

echo "📋 Fragments criados no repositório base:"
find news -name "*.md" -type f

# Debug: mostrar conteúdo dos fragments
echo "🔍 Conteúdo dos fragments criados:"
if [ -d "news" ]; then
    for dir in news/*/; do
        if [ -d "$dir" ]; then
            echo "📁 Diretório: $dir"
            for file in "$dir"*.md; do
                if [ -f "$file" ]; then
                    echo "📄 Arquivo: $file"
                    echo "Conteúdo: $(cat "$file")"
                fi
            done
        fi
    done
fi

echo "📝 Gerando changelog..."

# Verificar se há fragments antes de gerar changelog
echo "🔍 Verificando fragments antes de gerar changelog..."
echo "Backend news existe: $([ -d "backend/news" ] && echo "sim" || echo "não")"
echo "Backend news tem conteúdo: $([ -d "backend/news" ] && [ "$(ls -A backend/news)" ] && echo "sim" || echo "não")"
echo "Repositório news existe: $([ -d "news" ] && echo "sim" || echo "não")"
echo "Repositório news tem conteúdo: $([ -d "news" ] && [ "$(ls -A news)" ] && echo "sim" || echo "não")"

if [ -d "backend/news" ] && [ "$(ls -A backend/news)" ]; then
    echo "✅ Fragments encontrados no backend, gerando changelog..."
    echo "🔧 Comando: uvx repoplone changelog"
    echo "🔧 uvx path: $(which uvx 2>/dev/null || echo 'não encontrado')"
    uvx repoplone changelog
    echo "✅ Changelog gerado com sucesso!"
elif [ -d "news" ] && [ "$(ls -A news)" ]; then
    echo "✅ Fragments encontrados no repositório, gerando changelog..."
    echo "🔧 Comando: uvx repoplone changelog"
    echo "🔧 uvx path: $(which uvx 2>/dev/null || echo 'não encontrado')"
    uvx repoplone changelog
    echo "✅ Changelog gerado com sucesso!"
else
    echo "⚠️ Nenhum fragment encontrado, criando um antes de gerar changelog..."
    mkdir -p backend/news/feature
    echo "Atualização de versão automática" > backend/news/feature/001-version-update.md
    mkdir -p news/feature
    echo "Atualização de versão automática" > news/feature/001-version-update.md
    echo "🔧 Comando: uvx repoplone changelog"
    echo "🔧 uvx path: $(which uvx 2>/dev/null || echo 'não encontrado')"
    uvx repoplone changelog
    echo "✅ Changelog gerado com fragment padrão!"
fi

# Mostrar o changelog gerado
echo "📋 Conteúdo do changelog:"
if [ -f "CHANGELOG.md" ]; then
    tail -20 CHANGELOG.md
fi

echo "🚀 Teste concluído!" 