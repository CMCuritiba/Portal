# 🚀 Automação de Versionamento - Implementação Completa

## ✅ O que foi implementado

### 1. **Configurações do Semantic-Release**

- **`.releaserc.develop`**: Configuração para branch `develop`
  - Incrementa versão baseado em commits
  - Atualiza changelog e arquivos de versão
  - Não cria releases no GitHub

- **`.releaserc.production`**: Configuração para branches `homolog` e `main`
  - Cria releases com sufixo `-homolog` para homolog
  - Cria releases de produção para main
  - Atualiza tags especiais (`homolog`, `latest`)

- **`.releaserc.hotfix`**: Configuração para hotfixes
  - Incrementa PATCH automaticamente
  - Cria releases de hotfix
  - Atualiza tag `latest`

### 2. **Workflow GitHub Actions**

- **`.github/workflows/release.yml`**: Workflow principal
  - Executa em `develop`, `homolog`, `main`, e `hotfix/*`
  - Configuração específica para cada branch
  - Build automático de imagens Docker
  - Gerenciamento de tags especiais

### 3. **Scripts Auxiliares**

- **`scripts/create-hotfix.sh`**: Cria hotfixes seguindo a política
- **`scripts/commit-helper.sh`**: Ajuda com commits convencionais

### 4. **Documentação**

- **`docs/automacao-versionamento.md`**: Guia completo de uso
- **`README-AUTOMACAO.md`**: Este resumo

## 🔄 Fluxo Automatizado

### Branch `develop`
```bash
# Desenvolver feature
git checkout develop
git checkout -b feat/nova-funcionalidade
# ... commits seguindo Conventional Commits ...
git push origin feat/nova-funcionalidade
# Criar PR para develop
```

**Resultado automático:**
- ✅ Analisa commits e incrementa versão
- ✅ Atualiza `CHANGELOG.md`
- ✅ Atualiza versões em `package.json` e `setup.py`

### Branch `homolog`
```bash
# Após merge em develop
git checkout homolog
git merge develop
git push origin homolog
```

**Resultado automático:**
- ✅ Cria release `1.1.0-homolog`
- ✅ Atualiza tag `homolog`
- ✅ Gera build Docker com tag de homolog

### Branch `main`
```bash
# Após aprovação em homolog
git checkout main
git merge homolog
git push origin main
```

**Resultado automático:**
- ✅ Promove versão para produção `1.1.0`
- ✅ Atualiza tag `latest`
- ✅ Gera build Docker com tag de produção

### Hotfixes
```bash
# Usar script auxiliar
./scripts/create-hotfix.sh "fix-security-vulnerability"
# ... fazer correções ...
git commit -m "fix(security): patch XSS vulnerability"
git push origin hotfix/fix-security-vulnerability
# Criar PR para main
```

**Resultado automático:**
- ✅ Incrementa PATCH `1.0.0` → `1.0.1`
- ✅ Cria release de hotfix
- ✅ Atualiza tag `latest`
- ✅ Gera build Docker

## 🏷️ Tags Especiais

- **`homolog`**: Sempre aponta para última versão de homolog
- **`latest`**: Sempre aponta para última versão de produção

## 🐳 Imagens Docker

### Tags geradas automaticamente:
```
ghcr.io/cmcuritiba/portal/frontend:<versão>
ghcr.io/cmcuritiba/portal/frontend:<sha>
ghcr.io/cmcuritiba/portal/frontend:<branch>
ghcr.io/cmcuritiba/portal/frontend:latest (apenas main)

ghcr.io/cmcuritiba/portal/backend:<versão>
ghcr.io/cmcuritiba/portal/backend:<sha>
ghcr.io/cmcuritiba/portal/backend:<branch>
```

## 📋 Tipos de Commit

### Que afetam versionamento:
- `feat`: Nova funcionalidade → MINOR
- `fix`: Correção de bug → PATCH
- `refactor`: Refatoração → PATCH
- `perf`: Melhoria de performance → PATCH
- `BREAKING CHANGE`: Mudança incompatível → MAJOR

### Que NÃO afetam versionamento:
- `chore`: Tarefas de manutenção
- `docs`: Documentação
- `style`: Formatação
- `test`: Testes
- `ci`: Configurações de CI/CD
- `build`: Alterações de build

## 🛠️ Como usar

### 1. Desenvolvimento normal
```bash
# Usar commit helper
./scripts/commit-helper.sh

# Ou fazer commits manualmente
git commit -m "feat(auth): add OAuth2 authentication"
git commit -m "fix(login): correct password validation"
```

### 2. Hotfix
```bash
# Criar hotfix
./scripts/create-hotfix.sh "fix-security-vulnerability"

# Fazer correções e commits
git commit -m "fix(security): patch XSS vulnerability"

# Push e criar PR
git push origin hotfix/fix-security-vulnerability
```

### 3. Verificar status
```bash
# Ver tags
git tag --list

# Ver releases no GitHub
# Acessar: https://github.com/cmcuritiba/camara-de-curitiba/releases

# Ver imagens Docker
# Acessar: https://github.com/orgs/cmcuritiba/packages
```

## ⚠️ Pontos importantes

1. **Sempre use Conventional Commits**
2. **Teste localmente antes do push**
3. **Revise PRs cuidadosamente**
4. **Use hotfixes apenas para correções críticas**
5. **Mantenha develop sincronizada com main após hotfixes**

## 🔧 Troubleshooting

### Workflow não executa
- Verificar se o branch está correto
- Verificar permissões do GITHUB_TOKEN

### Versão não incrementa
- Verificar se os commits seguem Conventional Commits
- Verificar se há commits desde a última versão

### Build falha
- Verificar configuração das imagens Docker
- Verificar permissões do registry

## 📚 Documentação adicional

- `docs/versionamento.md`: Política de versionamento
- `docs/automacao-versionamento.md`: Guia detalhado de uso
- `docs/CONTRIBUTING.md`: Guia de contribuição

---

**🎉 Sistema de versionamento automatizado implementado com sucesso!**

O projeto agora segue completamente a política de versionamento definida, com automação completa do processo de release, build de imagens Docker e gerenciamento de tags especiais. 