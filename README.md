# Câmara de Curitiba 🚀

[![Construído com Cookiecutter Plone Starter](https://img.shields.io/badge/built%20with-Cookiecutter%20Plone%20Starter-0083be.svg?logo=cookiecutter)](https://github.com/collective/cookiecutter-plone-starter/)
[![Estilo de código Black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/ambv/black)

Um novo projeto utilizando Plone 6.

## Início Rápido 🏁

### Pré-requisitos ✅

Certifique-se de ter os seguintes itens instalados:

- Python 3.11 🐍
- Node 20 🟩
- yarn 🧶
- Docker 🐳

### Instalação 🔧

1. Clone o repositório:

```shell
git clone --
cd camara-de-curitiba
```

2. Instale tanto o Backend quanto o Frontend:

```shell
make install
```

### Iniciando os Servidores 🔥

1. Crie um novo site Plone na sua primeira execução:

```shell
make create-site
```

2. Inicie o Backend em [http://localhost:8080/](http://localhost:8080/):

```shell
make start-backend
```

3. Em um novo terminal, inicie o Frontend em [http://localhost:3000/](http://localhost:3000/):

```shell
make start-frontend
```

E pronto! Seu site Plone está rodando! 🎉

### Implantação da Stack Local 📦

Implante um ambiente `Docker Compose` local que inclui:

- Imagens Docker para Backend e Frontend 🖼️
- Uma stack com um roteador Traefik e um banco de dados Postgres 🗃️
- Acessível em [http://srv710292.hstgr.cloud](http://srv710292.hstgr.cloud) 🌐

Execute os seguintes comandos:

```shell
make stack-start
make stack-create-site
```

E pronto! Seu site Plone está rodando localmente! 🚀

## Estrutura do Projeto 🏗️

Este monorepo consiste em três seções distintas: `backend`, `frontend` e `devops`.

- **backend**: Contém a API e a instalação do Plone, utilizando pip em vez de buildout, incluindo um pacote de política chamado `camara_de_curitiba`.
- **frontend**: Contém o pacote React (Volto).
- **devops**: Inclui a Stack Docker, playbooks Ansible e configurações de cache.

### Por que essa estrutura? 🤔

- Todo o código necessário para rodar o site está contido no repositório (exceto addons existentes para Plone e React).
- Workflows específicos do GitHub são acionados com base em mudanças em cada parte do código (veja `.github/workflows`).
- Facilita a criação de imagens Docker para cada parte do código.
- Demonstra a instalação/configuração do Plone sem buildout.

## Garantia de Qualidade do Código 🧐

Para formatar automaticamente seu código e garantir que ele segue os padrões de qualidade, execute:

```shell
make format
```

Linters também podem ser executados individualmente dentro das pastas `backend` ou `frontend`.

## Internacionalização 🌐

Gere arquivos de tradução para Plone e Volto facilmente:

```shell
make i18n
```

## Como contribuir

Toda contribuição é bem vinda!

Para ajudar-nos a manter o bom trabalho, por favor leia nossas
[diretrizes](.github/CONTRIBUTING.md) e
[código de conduta](.github/CODE_OF_CONDUCT.md).

## Créditos e Agradecimentos 🙏

Criado com carinho por **Este projeto foi gerado pelo [cookiecutter-plone-starter](https://github.com/collective/cookiecutter-plone-starter) em 21/01/2025 às 23:10:45**. Um agradecimento especial a todos os contribuidores e apoiadores!

À equipe CMC, Digigroup e Dotend Digital.
