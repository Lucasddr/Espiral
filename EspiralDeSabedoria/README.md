# Espiral de Sabedoria — Landing Page

Site de uma profissional de acompanhamento terapêutico. Desenvolvido com HTML5, CSS3 e JavaScript Vanilla puro, seguindo a arquitetura modular do **MeuKit** e fielmente baseado no protótipo visual `Prototipo_LP_Anne_2.png`.

---

## Estrutura de arquivos

```
EspiralDeSabedoria/
├── index.html
├── css/
│   ├── main.css          ← Agregador (importa todos os módulos na ordem correta)
│   ├── variables.css     ← Tokens de design: cores, tipografia, espaçamentos
│   ├── base.css          ← Reset/normalização global
│   ├── layout.css        ← Estrutura: seções, containers, grids, cabeçalho, rodapé
│   ├── utilities.css     ← Classes utilitárias reutilizáveis
│   ├── components.css    ← Componentes: botões, cards, FAQ, formulários, etc.
│   └── pages.css         ← Estilos específicos de cada seção da LP
├── js/
│   └── script.js         ← Comportamentos: animações, menu, FAQ, i18n, formulários
└── imagens/
    ├── logo-spiral.svg          ← Logotipo em espiral (SVG inline-friendly)
    ├── favicon.svg              ← Favicon SVG
    ├── decor-folha.svg          ← Ramo decorativo de folhas (seção Sobre)
    ├── ornamento-esquerda.svg   ← Ornamento esquerdo de títulos de seção
    ├── ornamento-direita.svg    ← Ornamento direito de títulos de seção
    ├── icone-terapia-individual.svg
    ├── icone-regressoes.svg
    ├── icone-cura-energetica.svg
    ├── icone-constelacoes.svg
    ├── hero-foto.jpg            ← Placeholder visual (substituir pela foto real)
    ├── sobre-foto.jpg           ← Placeholder visual (substituir pela foto real)
    ├── cursos-foto.jpg          ← Placeholder visual (substituir pela foto real)
    ├── contato-foto.jpg         ← Placeholder visual (substituir pela foto real)
    └── avatar-depoimento.jpg   ← Placeholder de avatar (substituir pela foto real)
```

---

## Paleta de cores (extraída do protótipo)

| Token CSS               | Valor hex   | Uso                                              |
|-------------------------|-------------|--------------------------------------------------|
| `--color-bg`            | `#FBF7F4`   | Fundo principal (creme quente)                  |
| `--color-bg-alt`        | `#F1EFEC`   | Fundo alternativo (seções Sobre, FAQ)            |
| `--color-primary`       | `#1C3A4A`   | Títulos e textos de destaque (azul petróleo)     |
| `--color-accent`        | `#3A7D8F`   | Botões, links, ícones, etiquetas (teal)          |
| `--color-accent-dark`   | `#2C6373`   | Hover/estado ativo do accent                     |
| `--color-accent-soft`   | `#DCEAEE`   | Fundo dos ícones dos cards de terapia            |
| `--color-gold`          | `#D6B68A`   | Detalhe dourado da espiral do logotipo           |
| `--color-footer-bg`     | `#79A3BB`   | Fundo do rodapé                                  |
| `--color-border`        | `#E7E1D9`   | Bordas de cards e inputs                         |

---

## Tipografia

| Variável          | Família                           | Uso                           |
|-------------------|-----------------------------------|-------------------------------|
| `--font-heading`  | Playfair Display (Google Fonts)   | Títulos e subtítulos          |
| `--font-body`     | Inter (Google Fonts)              | Textos de parágrafo e UI      |

Ambas as fontes são carregadas via Google Fonts com `font-display: swap` implícito.

---

## Seções da página

| ID             | Descrição                                                    |
|----------------|--------------------------------------------------------------|
| `#hero`        | Apresentação principal com CTA e foto                        |
| `#sobre`       | Sobre a profissional, com ramo decorativo e foto             |
| `#terapias`    | 4 cards de serviços (mandala, sunburst, cristal, constelação)|
| `#cursos`      | Bloco de formação com imagem panorâmica                      |
| `#faq`         | 5 perguntas frequentes em acordeão acessível                 |
| `#depoimentos` | Depoimento + formulário de agendamento + foto decorativa     |

---

## JavaScript (`js/script.js`)

Tudo encapsulado em IIFE `(function(){ "use strict"; })()` para não poluir o escopo global.

### Funcionalidades

1. **Animação de entrada** — `IntersectionObserver` adiciona `.active` aos `.container` ao entrar na viewport (threshold 15%). Fallback para navegadores antigos.

2. **Cabeçalho inteligente** — Adiciona `.is-scrolled` ao `<header>` ao rolar mais de 12px (ativa sombra e border-bottom).

3. **Menu mobile** — Toggle `.is-open` no `<nav>`, controla `aria-expanded` no botão e bloqueia rolagem do body (`sem-rolagem`).

4. **Active link no scroll** — Segundo `IntersectionObserver` marca o link do menu correspondente à seção visível com `.is-ativo`.

5. **FAQ acordeão** — Controla `aria-expanded` e adiciona `.is-aberto` ao painel de resposta, que usa `grid-template-rows: 0fr → 1fr` para animação suave sem JS calculando altura.

6. **Seletor de idioma PT/ES** — Dicionário JS com todas as strings do site. Ao trocar, percorre `[data-i18n]` e substitui o texto; elementos com `[data-i18n-html]` recebem `innerHTML` (preserva tags `<em>` no título do hero); `[data-i18n-placeholder]` atualiza o `placeholder` dos inputs.

7. **Formulário de agendamento** — Valida nativamente com `checkValidity()`, bloqueia datas passadas via `min` dinâmico, exibe mensagem de sucesso ou erro, limpa o form após envio.

8. **Newsletter** — Valida e-mail, substitui o texto do botão por "Inscrito!" / "¡Listo!" por 2,5 segundos, depois restaura.

---

## Decisões de arquitetura

### Por que não `min-height: 100vh` nos `.container`?

O kit original usava `min-height: 100vh` nas seções para criar "slides" de tela cheia. O protótipo deste projeto é uma **landing page de fluxo contínuo** (cada seção tem altura variável conforme o conteúdo), então essa regra foi substituída por `padding-block: var(--space-xl)` em `.container`. A animação de entrada (`.container` → `.container.active`) foi integralmente mantida.

### Ondas decorativas entre seções

Implementadas como `<div class="onda onda--base">` com SVG `preserveAspectRatio="none"` e `currentColor`. A cor da onda é definida no CSS de cada seção (`color: var(--color-bg-alt)`), sem nenhuma cor hardcoded no SVG — facilita trocar o esquema de cores no futuro.

### Ícones SVG inline

Os ícones dos cards de terapia são SVG inline no HTML (não arquivos externos) porque precisam herdar `color: var(--color-accent)` via `stroke="currentColor"`. Os ornamentos e o ramo decorativo são `<img>` pois não precisam de `currentColor`.

### Acessibilidade

- `skip-link` para pular direto ao conteúdo principal
- Todos os `<img>` decorativos têm `alt=""` (ignorados por leitores de tela)
- Imagens de conteúdo têm `alt` descritivo
- FAQ usa padrão ARIA `aria-expanded` + `aria-controls` + `role="region"`
- Formulários têm `<label>` com `for` (visíveis com `.sr-only`)
- Menu mobile controla `aria-expanded` e `aria-controls`
- Botão de idioma usa `aria-pressed`
- Botão flutuante do WhatsApp tem `aria-label` descritivo
- `prefers-reduced-motion`: desabilita animações via media query no `base.css`
- `:focus-visible` visível e estilizado

### SEO

- `<title>` e `<meta name="description">` otimizados
- Open Graph e Twitter Card completos
- `<link rel="canonical">`
- Schema.org: `ProfessionalService` + `FAQPage` (dados estruturados ricos para Google)
- Hierarquia semântica: `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>`, `<figure>`
- Um único `<h1>` por página; `<h2>` para títulos de seção; `<h3>` para títulos de cards
- Atributos `width`/`height` em todos os `<img>` (evita CLS)
- `loading="eager"` no hero, `loading="lazy"` nas demais imagens
- Âncoras de seção com `scroll-margin-top` para compensar o cabeçalho fixo

---

## Como usar

1. **Abrir localmente** — Basta abrir `index.html` em qualquer navegador moderno. Não há build step, bundler ou dependência de servidor.

2. **Substituir as imagens placeholder** — As fotos em `imagens/` são gradientes gerados programaticamente. Substitua por fotos reais com as mesmas proporções:
- `hero-foto.jpg` → proporção 5:4 recomendada
- `sobre-foto.jpg` → proporção 4:3,4 recomendada
- `cursos-foto.jpg` → proporção 16:9 recomendada
- `contato-foto.jpg` → proporção 4:5 (vertical) recomendada
- `avatar-depoimento.jpg` → quadrado 1:1

3. **Atualizar os links do WhatsApp** — Substituir `5500000000000` pelo número real (com código do país) em todas as ocorrências do HTML e JS.

4. **Integrar o formulário de agendamento** — O `form#form-agendamento` tem `novalidate` e usa validação JS. Para enviar os dados, adicione a chamada ao seu backend/API no `submit` handler dentro de `script.js` (seção 6), após o `formAgendamento.checkValidity()`.

5. **Adicionar versão ES do protótipo** — A troca de idioma PT/ES já está implementada no JS. Caso o conteúdo espanhol precise de ajustes, edite o objeto `dicionario.es` em `script.js`.

---

## Dependências externas (CDN)

| Biblioteca            | Versão | Uso                                   |
|-----------------------|--------|---------------------------------------|
| Google Fonts          | —      | Playfair Display + Inter               |
| Font Awesome          | 6.5.2  | Ícones de UI (setas, WhatsApp, redes) |

Nenhuma dependência de JS de terceiros. O site funciona **sem JavaScript** (conteúdo visível, formulários nativos, menu de texto).

---

## Compatibilidade

Testado em: Chrome 120+, Firefox 121+, Safari 17+, Edge 120+.  
Responsivo: mobile-first, breakpoints em 620px, 760px, 920px, 1024px.

---

*Desenvolvido por Lucas Dutra — 2026*
