# Changelog - Atualizações do Workflow

## [2025-01-25] - Workflow RepoPlone Style

### ✅ Adicionado
- Workflow baseado no RepoPlone para branch `test`
- Análise inteligente de commits (feat, fix, breaking)
- Geração automática de fragments baseada no tipo de commit
- Integração com `GH_TOKEN` para autenticação
- Suporte a Python 3.12 (requerido para RepoPlone)
- Instalação automática do `uv`

### 🔧 Melhorado
- Análise de commits para determinar tipo de incremento
- Criação automática de fragments de notícias
- Limpeza automática de fragments após processamento
- Logs detalhados do processo

### 🐛 Corrigido
- Problema de instalação do RepoPlone (requer Python 3.12+)
- Uso correto do `GH_TOKEN` em vez de `GITHUB_TOKEN`
- Formato de tag sem sufixo no `version.txt`
- Removida dependência do GitHub CLI (usa API diretamente)

### 📋 Regras de Incremento
- **MAJOR**: `BREAKING CHANGE` ou `!:` → `1.0.0` → `2.0.0`
- **MINOR**: `feat:` → `1.0.0` → `1.1.0`
- **PATCH**: `fix:` ou outros → `1.0.0` → `1.0.1`

### 🎯 Exemplo de Uso
```bash
# Commit que gera MINOR increment
git commit -m "feat: adiciona nova funcionalidade"
git push origin test

# Resultado:
# version.txt: 1.0.0 → 1.1.0
# Tag: 1.1.0-test
# GitHub Release: "Release 1.1.0-test (Test)"
```

### 🔗 Arquivos Criados/Modificados
- `.github/workflows/release-test-repoplone.yml` - Workflow principal
- `docs/README-repoplone-workflow.md` - Documentação
- `docs/CHANGELOG-workflow-updates.md` - Este changelog 