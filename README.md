# IESPH — Portal Web Institucional

Modernización y rediseño de la plataforma web institucional del **Instituto de Educación Superior Público "Huanta" (IESPH)**, inspirado en la estructura y contenidos del sitio original en WordPress ([iesphuanta.edu.pe](https://iesphuanta.edu.pe)).

---

## Descripción del Proyecto

El objetivo principal es transformar el portal institucional tradicional en una experiencia web moderna, accesible, rápida y optimizada para multiples dispositivos (smartphones, tablets, PCs), orientada a la atracción de postulantes y usuarios mediante tecnologías de vanguardia y un diseño UI/UX/DX limpio y profesional.

### Características Clave
- **Identidad Institucional**: Paleta de colores oficial basada en gradientes azul/púrpura (`#7114EF` / `#1475F7`), tipografía limpia y elementos visuales de alto impacto.
- **Programas de Estudios (Licenciados)**:
  - Diseño y Programación Web
  - Enfermería Técnica
  - Mecatrónica Automotriz
  - Industrias de Alimentos y Bebidas
  - Producción Agropecuaria
- **Módulo de Admisión**: Guía paso a paso del proceso de admisión, requisitos, cronograma y formulario de captación / postulación.
- **Transparencia y Gestión**: Enlaces institucionales, TUPA, licenciamiento (R.M. N° 068-2020-MINEDU) y libro de reclamaciones.
- **Servicios y Vida Estudiantil**: Talleres prácticos, laboratorios, biblioteca y bolsa de trabajo.
- **Modal Interactivo de Carreras**: Vista detallada de cada programa con perfil de egreso, campo laboral y plan formativo.

---

## Stack Tecnológico

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) (motor nativo `@tailwindcss/vite`)
- **Herramienta de Construcción**: [Vite 8](https://vite.dev/)
- **Linter & Formateo**: [Biome 2.5.9](https://biomejs.dev/)
- **Íconos**: [Lucide React](https://lucide.dev/)

---

## Estructura del Proyecto

```text
src/
├── components/
│   ├── layout/          # Header institucional, navegación y Footer
│   ├── modals/          # Modales interactivos (detalle de carreras)
│   ├── sections/        # Secciones principales de la Landing Page
│   │   ├── HeroSection.tsx
│   │   ├── StatsStrip.tsx
│   │   ├── CareersSection.tsx
│   │   ├── WhyChooseUsSection.tsx
│   │   ├── AdmissionSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── NewsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CtaBanner.tsx
│   └── ui/              # Componentes base reutilizables
├── data/                # Información institucional estructurada (carreras, admisión, noticias)
├── types/               # Definiciones de TypeScript e interfaces del dominio
├── App.tsx              # Componente principal que orquesta la página
├── index.css            # Entrypoint de Tailwind CSS v4 y estilos globales
└── main.tsx             # Punto de entrada de la aplicación
```

---

## Documentación Técnica Detallada (`docs/`)

Para profundizar en los aspectos arquitectónicos, diseño y módulos del portal, consulta los documentos especializados:

1. [01. Visión General del Proyecto](docs/01-project-overview.md) — Identidad institucional, objetivos y oferta formativa.
2. [02. Arquitectura del Sistema](docs/02-system-architecture.md) — Clean Component Architecture, SSOT y decisiones técnicas.
3. [03. Sistema de Diseño](docs/03-design-system.md) — Paleta `#7114EF` / `#1475F7`, tipografía y microinteracciones.
4. [04. Programas de Estudios](docs/04-study-programs.md) — Perfil de egreso y campo laboral de las 5 carreras licenciadas.
5. [05. Módulo de Admisión](docs/05-admission-module.md) — Proceso de postulación en 4 pasos, modalidades y requisitos.
6. [06. Transparencia Institucional](docs/06-institutional-transparency.md) — Licenciamiento MINEDU, TUPA y documentos de gestión.
7. [07. Servicios y Vida Estudiantil](docs/07-campus-services.md) — Talleres prácticos, laboratorios, biblioteca y bolsa de empleo.
8. [08. Componentes y Secciones UI](docs/08-ui-sections.md) — Catálogo de componentes y flujos de usuario en la Landing Page.
9. [09. Hoja de Ruta de Desarrollo](docs/09-development-roadmap.md) — Fases de implementación, enrutamiento futuro y SEO.
10. [10. Funcionalidades Futuras](docs/10-future-features.md) — Admisión 100% digital, intranet académica y pagos de matrícula.

---

## Instalación y Uso

### Prerrequisitos
- Node.js (versión 20 o superior recomendada)
- Gestor de paquetes: `npm` o `pnpm`

### Comandos del Proyecto

Puedes utilizar **pnpm** (recomendado por `.mise.toml`) o **npm**:

#### 1. Ciclo de Vida y Desarrollo

| Acción | Con pnpm | Con npm | Descripción |
| :--- | :--- | :--- | :--- |
| **Instalar dependencias** | `pnpm install` | `npm install` | Instala paquetes y tipos necesarios |
| **Servidor de desarrollo** | `pnpm dev` | `npm run dev` | Inicia Vite en modo local con recarga en caliente (HMR) |
| **Compilar producción** | `pnpm build` | `npm run build` | Genera bundle optimizado en `/dist` |
| **Previsualizar build** | `pnpm preview` | `npm run preview` | Sirve la carpeta `/dist` localmente para validación |

#### 2. Calidad de Código, Formateo y Linter (Biome 2.5.9)

| Acción | Con pnpm | Con npm | Descripción |
| :--- | :--- | :--- | :--- |
| **Formatear código** | `pnpm format` | `npm run format` | Aplica sangría, comillas y salto de línea LF |
| **Revisar formato** | `pnpm format:check` | `npm run format:check` | Comprueba sin modificar si hay archivos mal formateados |
| **Ejecutar linter** | `pnpm lint` | `npm run lint` | Analiza reglas de buenas prácticas y potenciales errores |
| **Corregir linter** | `pnpm lint:fix` | `npm run lint:fix` | Aplica soluciones automáticas seguras del linter |
| **Check integral** | `pnpm check` | `npm run check` | Analiza formato, linting e imports en un solo paso |
| **Auto-reparar todo** | `pnpm check:fix` | `npm run check:fix` | Corrige linting, organiza imports y formatea el proyecto |
| *(Alias rápido de fix)* | `pnpm fix` | `npm run fix` | Equivalente a `check:fix` |

---

## Información Institucional

- **Institución**: IESP "Huanta" (IESPH)
- **Código Modular MINEDU**: 0434779
- **Dirección**: Jr. Córdova N° 650, Huanta, Ayacucho, Perú
- **Teléfono**: (066) 322296
- **Sitio de Referencia**: [iesphuanta.edu.pe](https://iesphuanta.edu.pe/)
