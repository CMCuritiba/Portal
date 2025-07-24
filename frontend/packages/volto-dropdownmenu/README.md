# Volto Dropdown Menu

Um addon para Volto que fornece funcionalidade de menu dropdown com interface de administração similar ao WordPress.

## Características

### 🎨 Interface WordPress-style
- **Layout de duas colunas**: Estrutura do menu à esquerda, configurações à direita
- **Design moderno**: Interface limpa e intuitiva similar ao WordPress
- **Responsivo**: Adaptação automática para dispositivos móveis
- **Navegação intuitiva**: Seleção visual de menus e itens

### ✅ Funcionalidades
- **Múltiplos menus**: Crie e gerencie vários menus independentes
- **Itens de menu flexíveis**: Links simples, externos ou dropdowns
- **Submenus**: Suporte completo para submenus de nível 2 com interface visual
- **Drag & drop visual**: Reordenação intuitiva de itens
- **Configurações avançadas**: Classes CSS, visibilidade, etc.

## Instalação

```bash
npm install volto-dropdownmenu
```

## Configuração

Adicione o addon ao seu `package.json`:

```json
{
  "addons": [
    "volto-dropdownmenu"
  ]
}
```

## Uso

### 1. Acesse o Painel de Controle

Navegue até `/controlpanel/dropdown-menu-settings` no seu site Volto.

### 2. Interface Principal

A interface está dividida em duas seções principais:

#### Painel Esquerdo - Estrutura do Menu
- **Lista de menus**: Visualize todos os menus criados
- **Seleção visual**: Clique em um menu para selecioná-lo
- **Gerenciamento de itens**: Adicione, remova e reordene itens
- **Ações rápidas**: Botões para mover e excluir itens
- **Submenus**: Visualização hierárquica com indentação

#### Painel Direito - Configurações
- **Configurações do menu**: Título e localização
- **Configurações do item**: Título, visibilidade, modo, links, etc.

### 3. Gerenciamento de Submenus

#### Adicionando Submenus
1. Clique no botão **+** (verde) ao lado de qualquer item de menu
2. O submenu será adicionado automaticamente com indentação visual
3. Configure o submenu no painel direito

#### Visualização de Submenus
- **Indentação**: Submenus são exibidos com uma linha azul de indentação
- **Fundo diferenciado**: Submenus têm fundo cinza claro para distinção visual
- **Ações**: Botão de exclusão disponível ao passar o mouse

#### Estrutura de Dados
```json
{
  "title": "Item Principal",
  "visible": true,
  "mode": "dropdown",
  "submenu": [
    {
      "title": "Submenu 1",
      "visible": true,
      "mode": "simpleLink",
      "linkUrl": ["/caminho/submenu1"]
    },
    {
      "title": "Submenu 2",
      "visible": true,
      "mode": "linkExternal",
      "link_external": "https://exemplo.com"
    }
  ]
}
```

### 4. Tipos de Itens

#### Link Simples
- Navegação interna para páginas do site
- Configuração de URL através do Object Browser

#### Link Externo
- Links para sites externos
- Configuração de URL manual

#### Dropdown
- Menus expansíveis com conteúdo rico
- Suporte a blocos de conteúdo
- Navegação por raiz de conteúdo

### 5. Configurações Avançadas

#### Classes CSS Adicionais
- Aplique estilos específicos aos itens
- Compatível com o layout do site

#### Visibilidade
- Controle a exibição de itens
- Útil para menus condicionais

#### Blocos de Conteúdo
- Adicione conteúdo rico aos dropdowns
- Suporte a texto, listagens, imagens, etc.

## Estrutura de Arquivos

```
src/
├── components/
│   ├── DropdownMenu.jsx          # Componente de renderização
│   └── dropdownmenu.css          # Estilos do frontend
├── widget/
│   ├── MenuConfigurationWidget.jsx  # Widget principal
│   ├── MenuConfigurationForm.jsx    # Formulário de configuração
│   └── menu_configuration.css       # Estilos da administração
├── customizations/
│   └── components/theme/Navigation/  # Integração com navegação
└── utils.js                      # Utilitários
```

## Personalização

### Estilos CSS
O plugin inclui estilos WordPress-style que podem ser personalizados:

```css
/* Personalizar cores do tema */
.wordpress-menu-widget {
  --primary-color: #0073aa;
  --secondary-color: #f9f9f9;
  --border-color: #ddd;
}

/* Personalizar submenus */
.submenu-item {
  background: #f8f9fa;
  border-left: 3px solid #0073aa;
}
```

### Integração com Tema
O plugin se integra automaticamente com o sistema de navegação do Volto e pode ser estendido através do sistema de customizações.

## Suporte

Para dúvidas ou problemas, consulte:
- [Documentação do Volto](https://docs.voltocms.com/)
- [Issues do projeto](https://github.com/collective/volto-dropdownmenu/issues)

## Licença

Este projeto está licenciado sob a licença MIT.

## Changelog

### v2.0.0 - Interface WordPress-style
- ✨ Nova interface de duas colunas
- 🎨 Design moderno similar ao WordPress
- 📱 Melhor responsividade
- 🔧 Reorganização dos formulários
- 🎯 Navegação mais intuitiva

### v1.x.x - Versões anteriores
- Funcionalidade básica de dropdown
- Suporte a submenus
- Interface original
