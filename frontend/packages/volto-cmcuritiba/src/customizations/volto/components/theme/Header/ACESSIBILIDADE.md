# Funcionalidades de Acessibilidade - Header

## 📋 Visão Geral

Este documento descreve as funcionalidades de acessibilidade implementadas no componente Header do projeto Câmara de Curitiba, seguindo as diretrizes WCAG 2.1 AA e eMAG.

## 🎯 Funcionalidades Implementadas

### 1. **Controle de Contraste** 🌗
- **Botão**: "Contraste"
- **Funcionalidade**: Alterna entre modo normal e alto contraste
- **Persistência**: Salva preferência no localStorage
- **Visual**: 
  - Fundo preto (#000000)
  - Texto branco (#ffffff)
  - Links em amarelo (#ffff00)
  - Imagens invertidas

### 2. **Controle de Fonte** 📝
- **Botões**: "A+" (aumentar) e "A-" (diminuir)
- **Range**: 80% a 150% do tamanho original
- **Incremento**: 10% por clique
- **Indicador**: Mostra porcentagem atual
- **Persistência**: Salva no localStorage
- **Feedback**: Indicador visual em tempo real

### 3. **VLibras** 🤟
- **Botão**: "VLibras"
- **Funcionalidade**: Ativa/desativa tradução para Libras
- **Integração**: Plugin oficial do Governo Federal
- **Script**: https://vlibras.gov.br/app/vlibras-plugin.js
- **Persistência**: Salva estado no localStorage

### 4. **Reset de Acessibilidade** ↺
- **Botão**: "Acessibilidade"
- **Funcionalidade**: Restaura todas as configurações padrão
- **Ações**:
  - Remove alto contraste
  - Restaura fonte para 100%
  - Desativa VLibras
  - Limpa localStorage

## 🔧 Implementação Técnica

### Estados Gerenciados
```javascript
const [isHighContrast, setIsHighContrast] = useState(false);
const [fontSize, setFontSize] = useState(100);
const [vlibrasEnabled, setVlibrasEnabled] = useState(false);
```

### Persistência
```javascript
localStorage.setItem('accessibility-high-contrast', value);
localStorage.setItem('accessibility-font-size', value);
localStorage.setItem('accessibility-vlibras', value);
```

### Classes CSS Aplicadas
- `body.high-contrast` - Alto contraste
- `.active-accessibility` - Estado ativo dos botões
- `.font-size-indicator` - Indicador de tamanho

## ♿ Acessibilidade por Teclado

### Navegação
- **Tab**: Navega entre botões
- **Enter/Space**: Ativa funcionalidade
- **Escape**: Fecha menus (quando aplicável)

### Atributos ARIA
```jsx
aria-label="Descrição da função"
aria-pressed={estado}
aria-live="polite"
tabIndex={0}
```

### Focus Visível
- Outline de 3px azul (#005fcc)
- Alto contraste: outline amarelo (#ffff00)
- Offset de 2px para clareza

## 📱 Responsividade

### Mobile (≤768px)
- Indicador de fonte menor
- Tooltips adaptados
- Navegação otimizada

### Desktop (>768px)
- Tooltips completos
- Hover effects
- Feedback visual aprimorado

## 🎨 Estilos Visuais

### Estados dos Botões
- **Normal**: Estilo padrão
- **Ativo**: Fundo azul, borda destacada
- **Hover**: Escala 1.05, fundo translúcido
- **Focus**: Outline destacado
- **Disabled**: Opacidade 50%

### Tooltips
- Fundo escuro (#333)
- Texto branco
- Borda branca
- Alto contraste: fundo amarelo, texto preto

## 🔄 Fluxo de Funcionamento

1. **Carregamento da Página**
   - Lê preferências do localStorage
   - Aplica configurações salvas
   - Inicializa VLibras se ativo

2. **Interação do Usuário**
   - Clique/teclado ativa função
   - Estado visual atualizado
   - Preferência salva no localStorage
   - Feedback imediato fornecido

3. **Reset**
   - Remove todas as configurações
   - Volta ao estado padrão
   - Limpa localStorage
   - Feedback de confirmação

## 📊 Métricas de Conformidade

### WCAG 2.1 AA ✅
- **1.4.3 Contraste**: Mínimo 4.5:1 garantido
- **1.4.4 Redimensionamento**: Até 200% sem perda
- **2.1.1 Teclado**: Navegação completa
- **2.4.7 Foco Visível**: Indicadores claros
- **3.2.2 Entrada**: Sem mudanças automáticas

### eMAG ✅
- **Recomendação 1**: Marcação adequada
- **Recomendação 3**: Idioma definido
- **Recomendação 6**: Links descritivos
- **Recomendação 15**: Contraste adequado

## 🔧 Manutenção

### Atualizações do VLibras
- Verificar periodicamente se há novas versões
- Testar compatibilidade com atualizações
- Manter URL do script atualizada

### Testes Recomendados
- Navegação apenas por teclado
- Leitores de tela (NVDA, JAWS, VoiceOver)
- Diferentes tamanhos de tela
- Alto contraste nativo do SO
- Verificação periódica de contraste

## 📞 Suporte

Para questões sobre acessibilidade:
- Documentação WCAG: https://www.w3.org/WAI/WCAG21/
- eMAG: https://www.gov.br/governodigital/pt-br/acessibilidade
- VLibras: https://www.vlibras.gov.br/

---

*Última atualização: Dezembro 2024*
*Versão: 1.0* 