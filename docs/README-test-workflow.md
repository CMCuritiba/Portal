# Workflow de Release para Branch Test

## Resumo

Este workflow automatiza o processo de release para a branch `test` usando **towncrier** para gerenciar versões e changelog do monorepo.

## 🚀 Como Usar

### 1. Criar Fragments de Notícias

Antes de fazer push para a branch `test`, crie fragments de notícias:

```bash
# Criar fragment para nova funcionalidade
echo "Adiciona nova funcionalidade de busca" > news/feature/001-search-feature.md

# Criar fragment para correção de bug
echo "Corrige problema de login" > news/bugfix/002-login-fix.md

# Criar fragment para documentação
echo "Atualiza documentação da API" > news/documentation/003-api-docs.md
```

### 2. Fazer Push para Branch Test

```bash
git add news/
git commit -m "feat: adiciona fragments para nova release"
git push origin test
```

### 3. Workflow Executa Automaticamente

O workflow irá:
- ✅ Analisar commits para determinar tipo de incremento
- ✅ Verificar fragments de notícias
- ✅ Gerar changelog com towncrier
- ✅ Incrementar versão baseado nos commits (feat=minor, fix=patch, breaking=major)
- ✅ Commitar alterações
- ✅ Criar tag de release
- ✅ Criar GitHub Release
- ✅ Limpar fragments processados

## 📁 Estrutura de Fragments

```
news/
├── breaking/     # Mudanças que quebram compatibilidade
├── feature/      # Novas funcionalidades
├── bugfix/       # Correções de bugs
├── internal/     # Mudanças internas
└── documentation/ # Mudanças na documentação
```

## 📝 Formato dos Fragments

Cada fragment deve ser um arquivo `.md` com:

```markdown
Descrição da mudança

- Detalhe 1
- Detalhe 2
- Detalhe 3
```

**Exemplo:**
```markdown
Adiciona sistema de busca avançada

- Implementa busca por texto completo
- Adiciona filtros por categoria
- Melhora performance da busca
- Adiciona suporte a busca fuzzy
```

## 🔧 Configuração

O workflow usa:
- **Python 3.11**
- **Towncrier** (configurado via `towncrier.toml`)
- **Versão** lida de `version.txt`
- **Changelog** gerado em `CHANGELOG.md`

## 📈 Regras de Incremento de Versão

O workflow analisa os commits desde a última tag para determinar o tipo de incremento:

### 🔴 MAJOR (X.0.0)
- Commits com `BREAKING CHANGE` ou `!:` no corpo
- Mudanças que quebram compatibilidade

### 🟡 MINOR (X.Y.0)
- Commits com prefixo `feat:`
- Novas funcionalidades

### 🟢 PATCH (X.Y.Z)
- Commits com prefixo `fix:` ou `bugfix:`
- Correções de bugs
- Qualquer outro tipo de commit (padrão)

**Exemplo:**
```bash
# MAJOR increment
git commit -m "feat: nova API! BREAKING CHANGE: remove endpoint antigo"

# MINOR increment  
git commit -m "feat: adiciona nova funcionalidade de busca"

# PATCH increment
git commit -m "fix: corrige problema de login"
```

## 📊 Exemplo de Saída

Após executar o workflow:

### Versão Atualizada
```txt
# version.txt
1.0.1
```

### Changelog Gerado
```markdown
# CHANGELOG.md
## 1.0.1 (2025-01-25)

### Feature

- Adiciona sistema de busca avançada
- Implementa busca por texto completo
- Adiciona filtros por categoria
- Melhora performance da busca
- Adiciona suporte a busca fuzzy
```

### Tag Criada
```
1.0.1-test
```

### GitHub Release
- Título: "Release 1.0.1-test (Test)" (tag com sufixo -test)
- Marcação: Prerelease
- Conteúdo: Changelog completo

## 🛠️ Troubleshooting

### Problema: Sem fragments
**Solução:** O workflow criará automaticamente um fragment de exemplo

### Problema: Erro de permissão
**Solução:** Verifique se o `GITHUB_TOKEN` tem permissões:
- `contents: write`
- `packages: write`

### Problema: Formato de versão inválido
**Solução:** Verifique se `version.txt` está no formato `X.Y.Z` ou `X.Y.ZaN`

## 📋 Logs do Workflow

Os logs mostrarão:
```
🔍 Verificando fragments de notícias...
✅ Fragments encontrados: news/feature/001-search-feature.md
📝 Gerando changelog com Towncrier...
✅ Changelog gerado com sucesso
🔄 Atualizando versão...
✅ Versão atualizada para: 1.0.1
💾 Commitando alterações...
✅ Alterações enviadas para branch test
🏷️ Criando tag de release...
✅ Tag 1.0.1-test criada e enviada
📦 Criando GitHub Release...
✅ GitHub Release criado: 1.0.1-test
🧹 Limpando fragments de notícias...
✅ Fragments removidos
✅ Limpeza commitada
```

## 🔗 Arquivos Relacionados

- `.github/workflows/release-test.yml` - Workflow principal
- `towncrier.toml` - Configuração do towncrier
- `version.txt` - Versão atual do projeto
- `CHANGELOG.md` - Changelog gerado
- `news/.changelog_template.jinja` - Template do changelog 