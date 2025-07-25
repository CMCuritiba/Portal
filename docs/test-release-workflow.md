# Workflow de Release para Branch Test

Este documento explica como funciona o workflow de release automatizado para a branch `test` usando towncrier.

## Visão Geral

O workflow `.github/workflows/release-test.yml` automatiza o processo de release para a branch `test` usando towncrier para gerenciar versões e changelog.

## Como Funciona

### 1. Trigger
O workflow é executado quando:
- Há push para a branch `test`
- Há pull request para a branch `test`

### 2. Processo de Release

#### Verificação de Fragments
- Verifica se existem fragments de notícias no diretório `news/`
- Se não existirem, cria um fragment de exemplo

#### Geração do Changelog
- Usa towncrier para gerar o changelog baseado nos fragments
- Atualiza o arquivo `CHANGELOG.md`

#### Atualização da Versão
- Lê a versão atual do `version.txt`
- Incrementa a versão patch (sem sufixo no version.txt)
- Atualiza o `version.txt` (ex: `1.0.1`)
- Adiciona sufixo `-test` apenas na tag do repositório

#### Commit e Push
- Commita as alterações no `version.txt` e `CHANGELOG.md`
- Faz push para a branch `test`

#### Criação de Tag
- Cria uma tag anotada com a nova versão + sufixo -test (formato: semver-test)
- Faz push da tag para o repositório

#### GitHub Release
- Cria um GitHub Release com a tag
- Marca como prerelease
- Inclui o conteúdo do changelog

#### Limpeza
- Remove os fragments de notícias processados
- Commita a limpeza

## Estrutura de Fragments

Os fragments devem ser criados no diretório `news/` seguindo a estrutura:

```
news/
├── breaking/     # Mudanças que quebram compatibilidade
├── feature/      # Novas funcionalidades
├── bugfix/       # Correções de bugs
├── internal/     # Mudanças internas
└── documentation/ # Mudanças na documentação
```

### Formato dos Fragments

Cada fragment deve ser um arquivo `.md` com:
- Nome único (ex: `001-feature-name.md`)
- Descrição da mudança
- Lista de detalhes (opcional)

Exemplo:
```markdown
Adiciona nova funcionalidade de busca

- Implementa busca avançada
- Adiciona filtros por categoria
- Melhora performance da busca
```

## Configuração

O workflow usa as seguintes configurações:

- **Python**: 3.11
- **Towncrier**: Configurado via `towncrier.toml`
- **Versão**: Lida de `version.txt`
- **Changelog**: Gerado em `CHANGELOG.md`

## Permissões Necessárias

O workflow requer as seguintes permissões:
- `contents: write` - Para fazer commits e push
- `packages: write` - Para criar releases

## Exemplo de Uso

1. Crie fragments de notícias em `news/feature/`
2. Faça push para a branch `test`
3. O workflow executará automaticamente
4. Uma nova versão será criada com sufixo `-test`
5. O changelog será atualizado
6. Uma tag e GitHub Release serão criados

## Troubleshooting

### Problemas Comuns

1. **Sem fragments**: O workflow criará um fragment de exemplo
2. **Erro de permissão**: Verifique se o `GITHUB_TOKEN` tem permissões adequadas
3. **Conflito de versão**: Verifique se o formato do `version.txt` está correto

### Logs

Os logs do workflow mostrarão:
- ✅ Fragmentos encontrados
- ✅ Changelog gerado
- ✅ Versão atualizada
- ✅ Alterações commitadas
- ✅ Tag criada
- ✅ GitHub Release criado
- ✅ Fragmentos limpos 