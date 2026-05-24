# My Design System

<p align="center">
  <strong>Librería de componentes Vue 3 · Tailwind CSS v4 · TypeScript · Storybook</strong>
</p>

<p align="center">
  <a href="https://github.com/mikeljc-dev/my-design-system/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/mikeljc-dev/my-design-system/actions/workflows/ci.yml/badge.svg" /></a>
  <a href="https://mikeljc-dev.github.io/my-design-system"><img alt="Storybook" src="https://img.shields.io/badge/Storybook-Live-FF4785?logo=storybook&logoColor=white" /></a>
  <img alt="Tests" src="https://img.shields.io/badge/tests-158%20passed-22c55e" />
  <img alt="Coverage" src="https://img.shields.io/badge/coverage-78%25-22c55e" />
  <img alt="Vue 3" src="https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-gray" />
</p>

<p align="center">
  <a href="https://mikeljc-dev.github.io/my-design-system"><strong>→ Ver Storybook en vivo</strong></a>
</p>

---

## ¿Qué es?

Un design system de producción construido desde cero, con foco en **accesibilidad**, **DX** y **escalabilidad**. Incluye 22 componentes organizados en 5 categorías, cobertura de tests completa, tokens de diseño compilados y documentación interactiva desplegada.

---

## Decisiones de arquitectura

| Decisión | Motivación |
|---|---|
| **Monorepo pnpm + Turborepo** | Builds cacheados y orquestados; separación clara entre `tokens`, `ui` y `storybook` |
| **Style Dictionary v5** | Tokens JSON → CSS variables y JS desde un único source of truth |
| **Tailwind CSS v4** | CSS-first con `@theme`; cero config JS; clases de utilidad colocadas junto al markup |
| **Vite library mode** | Tree-shaking automático: importar `DsButton` no arrastra el resto de la librería |
| **Changesets** | Changelog y bump de versión generados por CI en cada merge a `main` |
| **Storybook 8** + **addon-a11y** | Documentación viva + auditoría ARIA automática en cada story |

---

## Uso rápido

Clona el repo y ejecuta:

```bash
pnpm install
pnpm build
pnpm storybook   # → http://localhost:6006
```

O explora la documentación desplegada en **[GitHub Pages](https://mikeljc-dev.github.io/my-design-system)**.

### Ejemplo de uso de componentes

```vue
<script setup lang="ts">
import { DsButton, DsInput, DsBadge } from '@my-ds/ui';
</script>

<template>
  <DsBadge variant="success">Online</DsBadge>

  <DsInput label="Email" v-model="email" placeholder="tu@email.com" />

  <DsButton variant="primary" :loading="saving" @click="save">
    Guardar cambios
  </DsButton>
</template>
```

Registro global como plugin de Vue:

```ts
import { createApp } from 'vue';
import { install } from '@my-ds/ui';
import '@my-ds/ui/styles';

createApp(App).use({ install }).mount('#app');
```

---

## Componentes

### Primitivos
| Componente | Descripción | ARIA |
|---|---|---|
| `DsButton` | Variantes primary / secondary / ghost / danger, tamaños, estado loading, polimórfico (`as`) | `aria-busy`, `aria-disabled` |
| `DsInput` | Label, hint, error, tipos nativos | `aria-invalid`, `aria-describedby` |
| `DsBadge` | Etiqueta de estado con punto indicador | Semántico |
| `DsAvatar` | Imagen o iniciales generadas automáticamente | `aria-label` |
| `DsCard` | Superficie con slots header / footer / default | Semántico |

### Formularios
| Componente | Descripción | ARIA |
|---|---|---|
| `DsCheckbox` | Estado indeterminate, hint, error | `role="checkbox"`, `aria-checked="mixed"` |
| `DsSwitch` | Toggle en 3 tamaños | `role="switch"`, `aria-checked` |
| `DsRadio` | Radio individual, compatible con grupo v-model | `role="radio"` |
| `DsSelect` | Select nativo con wrapper personalizado | `aria-invalid`, `aria-describedby` |
| `DsTextarea` | Contador de caracteres, resize configurable | `aria-live` en contador |

### Feedback
| Componente | Descripción | ARIA |
|---|---|---|
| `DsModal` | Focus trap, cierre con Escape y backdrop | `role="dialog"`, `aria-modal`, `aria-labelledby` |
| `DsToast` + `useToast` | Notificaciones con cola reactiva, 4 variantes | `role="alert"` |
| `DsAlert` | Banner inline dismissible | `role="alert"` |
| `DsSpinner` | Indicador de carga en 4 tamaños | `role="status"` |
| `DsSkeleton` | Placeholder animado (text / circle / rect) | `aria-busy` |
| `DsProgress` | Barra de progreso determinada e indeterminada | `role="progressbar"`, `aria-valuenow/min/max` |

### Navegación
| Componente | Descripción | ARIA |
|---|---|---|
| `DsTabs` | Variantes line y pill, navegación con teclado (← → Home End) | `role="tablist/tab/tabpanel"`, `aria-selected` |
| `DsAccordion` | Modo múltiple, animación, items deshabilitados | `aria-expanded`, `aria-controls`, `role="region"` |
| `DsBreadcrumb` | Separador configurable | `aria-current="page"` |
| `DsPagination` | Lógica de elipsis, prop `siblings` | `aria-current="page"` |

### Overlays
| Componente | Descripción | ARIA |
|---|---|---|
| `DsTooltip` | 4 posiciones, delay configurable, trigger por hover y foco | `role="tooltip"`, `aria-describedby` |
| `DsDropdown` | Menú contextual, items danger/separator, trigger slot, keyboard nav | `role="menu/menuitem"`, `aria-haspopup`, `aria-expanded` |

---

## Estructura del monorepo

```
my-design-system/
├── packages/
│   ├── tokens/        ← JSON → CSS variables + JS  (Style Dictionary v5)
│   └── components/    ← 22 componentes Vue 3        (@my-ds/ui)
├── apps/
│   └── storybook/     ← documentación interactiva   (@my-ds/storybook)
├── .github/
│   └── workflows/
│       ├── ci.yml        ← lint + build + test en cada PR
│       ├── release.yml   ← publish npm en merge a main
│       └── storybook.yml ← deploy GitHub Pages en merge a main
├── turbo.json         ← pipeline de builds
└── pnpm-workspace.yaml
```

---

## Tokens de diseño

Los tokens viven en `packages/tokens/src/` como JSON y se compilan a dos formatos:

```css
/* CSS variables (consumidas por Tailwind @theme y apps host) */
--ds-color-primary: #3b82f6;
--ds-color-danger:  #e24b4a;
```

```js
// JS (para herramientas programáticas)
export const DsColorPrimary = '#3b82f6';
```

---

## Scripts

```bash
pnpm build          # compila tokens + componentes + storybook
pnpm test           # ejecuta todos los tests
pnpm coverage       # genera reporte de cobertura
pnpm storybook      # Storybook en http://localhost:6006
```

---

## Tests

```
 Test Files  19 passed (19)
      Tests  158 passed (158)
   Coverage  78% statements | 78% branches | 80% functions
```

Tecnologías: **Vitest** + **@testing-library/vue** + **@testing-library/jest-dom**

Los tests cubren: renderizado, ARIA correcto, emisión de eventos, estados deshabilitados, lógica de negocio (paginación, ellipsis, accordion múltiple).

---

## Añadir un componente nuevo

```bash
# 1. Crea la carpeta
mkdir packages/components/src/components/MiComponente

# 2. Implementa el componente
# packages/components/src/components/MiComponente/MiComponente.vue

# 3. Escribe los tests
# packages/components/src/components/MiComponente/MiComponente.test.ts

# 4. Exporta en el barrel
# packages/components/src/index.ts → export { default as DsMiComponente } from '...'

# 5. Añade la story
# apps/storybook/stories/MiComponente.stories.ts

# 6. Verifica
pnpm build && pnpm test
```

---

## Licencia

MIT — [Mikel](https://github.com/mikeljc-dev)
