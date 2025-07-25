# Workflow de Release Baseado no RepoPlone

## 🎯 Visão Geral

Este workflow simula o comportamento do RepoPlone para automatizar releases na branch `test`, seguindo as convenções do ecossistema Plone.

## 🚀 Características

### ✅ **RepoPlone Integration**
- Usa `uvx repoplone` para gerenciar releases
- Comandos: `versions current`, `changelog`, `release`
- Segue convenções do ecossistema Plone

### ✅ **Análise Inteligente de Commits**
- Analisa commits desde a última tag
- Detecta tipos: `feat:`, `fix:`, `bugfix:`, `BREAKING CHANGE`
- Determina incremento: MAJOR, MINOR ou PATCH

### ✅ **Gerenciamento de Versões**
- Usa `version.txt` como fonte da verdade
- RepoPlone gerencia incrementos automaticamente
- Suporte a diferentes segmentos de versão

### ✅ **Changelog Automático**
- RepoPlone gera changelog via towncrier
- Processa fragments de notícias automaticamente
- Limpa fragments após processamento

## 📋 Como Usar

### 1. **Configurar Secrets**
No GitHub, configure os secrets:
- `GH_TOKEN`: Token do GitHub com permissões de repo

### 2. **Fazer Commits Seguindo Conventional Commits**
```bash
# MAJOR increment
git commit -m "feat: nova API! BREAKING CHANGE: remove endpoint antigo"

# MINOR increment
git commit -m "feat: adiciona nova funcionalidade de busca"

# PATCH increment
git commit -m "fix: corrige problema de login"
```

### 3. **Push para Branch Test**
```bash
git push origin test
```

### 4. **Workflow Executa Automaticamente**
O workflow irá:
- ✅ Verificar versões atuais com RepoPlone
- ✅ Analisar commits para determinar tipo de incremento
- ✅ Gerar changelog com RepoPlone
- ✅ Criar release com RepoPlone (dry-run)
- ✅ Commitar e enviar alterações

## 📈 Regras de Incremento

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

## 📊 Exemplo de Saída

### Versão Atualizada
```txt
# version.txt (antes)
1.0.0

# version.txt (depois) - commit com feat:
1.1.0
```

### Tag Criada
```
1.1.0-test
```

### GitHub Release
- Título: "Release 1.1.0-test (Test)"
- Marcação: Prerelease
- Conteúdo: Changelog completo

## 🔧 Configuração

### Arquivos Necessários
- `repository.toml` - Configuração do monorepo
- `version.txt` - Versão atual
- `towncrier.toml` - Configuração do towncrier
- `CHANGELOG.md` - Changelog gerado

### Secrets do GitHub
```yaml
GH_TOKEN: ${{ secrets.GH_TOKEN }}
```

## 📋 Logs do Workflow

Os logs mostrarão:
```
📋 Verificando versões atuais...
Repository: 1.0.0
Backend Package: 1.0.0
Frontend Package: 1.0.0

🔍 Analisando commits para determinar tipo de incremento...
🟡 Feature detectada - MINOR increment

📝 Gerando changelog...
✅ Changelog gerado com sucesso

🚀 Criando release com RepoPlone...
✅ Release criado com sucesso

💾 Commitando e enviando alterações...
✅ Alterações enviadas para branch test
```

## 🛠️ Troubleshooting

### Problema: Erro de autenticação
**Solução:** Verifique se o `GH_TOKEN` está configurado corretamente

### Problema: Erro de permissão
**Solução:** Verifique se o token tem permissões:
- `contents: write`
- `packages: write`

### Problema: Formato de versão inválido
**Solução:** Verifique se `version.txt` está no formato `X.Y.Z`

## 🔗 Arquivos Relacionados

- `.github/workflows/release-test-repoplone.yml` - Workflow principal
- `repository.toml` - Configuração do monorepo
- `towncrier.toml` - Configuração do towncrier
- `version.txt` - Versão atual do projeto
- `CHANGELOG.md` - Changelog gerado

## 🎯 Vantagens sobre o Workflow Anterior

1. **Estilo RepoPlone**: Segue convenções do ecossistema Plone
2. **Análise Inteligente**: Detecta tipo de commit automaticamente
3. **Versões Centralizadas**: Usa `version.txt` como fonte da verdade
4. **GitHub Integration**: Usa `GH_TOKEN` diretamente via API (sem CLI)
5. **Changelog Automático**: Integra towncrier com fragments automáticos 