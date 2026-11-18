import type { FooterSection, NavItem, QuickLink } from "@/types"

export const TOP_NAV_LINKS: QuickLink[] = [
  { label: "Postulante", href: "/admision", badge: "Admisión 2026" },
  {
    label: "Portal Estudiante (SIGAEST)",
    href: "https://iestphuanta.sistema.edu.pe/login/",
  },
  { label: "Bolsa Laboral (AVANZA)", href: "https://avanza.minedu.gob.pe/" },
]

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    label: "Nosotros",
    href: "/presentacion",
    children: [
      {
        label: "Presentación",
        href: "/presentacion",
      },
      {
        label: "Visión, Misión y Valores",
        href: "/mision-vision",
      },
      {
        label: "Organización Institucional",
        href: "/organizacion",
      },
      {
        label: "Plana jerárquica",
        href: "/plana-jerarquica",
      },
      {
        label: "Plana docente",
        href: "/plana-docente",
      },
      {
        label: "Local",
        href: "/local",
      },
    ],
  },
  {
    label: "Programas de estudios",
    shortLabel: "Carreras",
    href: "/carreras",
    children: [
      {
        label: "Diseño y Programación Web",
        href: "/carreras/diseno-programacion-web",
      },
      {
        label: "Enfermería Técnica",
        href: "/carreras/enfermeria-tecnica",
      },
      {
        label: "Mecatrónica Automotriz",
        href: "/carreras/mecatronica-automotriz",
      },
      {
        label: "Industrias de Alimentos y Bebidas",
        href: "/carreras/industrias-alimentos-bebidas",
      },
      {
        label: "Producción Agropecuaria",
        href: "/carreras/produccion-agropecuaria",
      },
    ],
  },
  {
    label: "Admisión y Matricula",
    shortLabel: "Admisión",
    href: "/admision",
    children: [
      {
        label: "Admisión 2026",
        href: "/admision",
      },
      {
        label: "Matrícula",
        href: "/admision",
      },
      {
        label: "Becas y Créditos",
        href: "https://www.gob.pe/pronabec",
      },
    ],
  },
  {
    label: "Transparencia",
    shortLabel: "Transparencia",
    href: "/transparencia",
    children: [
      {
        label: "Documentos de Gestión",
        href: "/docs/PEI-IESPH.pdf",
      },
      {
        label: "Estadísticas",
        href: "/transparencia",
      },
      {
        label: "Inversiones y Recursos Económicos",
        href: "/transparencia",
      },
      {
        label: "Libro de reclamaciones",
        href: "/libro-de-reclamaciones",
      },
      {
        label: "Licenciamiento",
        href: "/docs/Licenciamiento-RMN371-2025-MINEDU.pdf",
      },
    ],
  },
  {
    label: "Tramite",
    shortLabel: "Trámite",
    href: "/tramite",
    children: [
      {
        label: "TUPA",
        href: "/docs/TUPA-IESPH.pdf",
      },
    ],
  },
  {
    label: "Contáctanos",
    shortLabel: "Contacto",
    href: "/contacto",
  },
  {
    label: "Servicios",
    shortLabel: "Servicios",
    href: "/servicios",
    children: [
      {
        label: "Biblioteca",
        href: "/servicios",
      },
      {
        label: "Servicios complementarios",
        href: "/servicios",
      },
      {
        label: "Bolsa Laboral",
        href: "https://avanza.minedu.gob.pe/",
      },
    ],
  },
  {
    label: "Otras páginas",
    shortLabel: "Enlaces",
    href: "/enlaces",
    children: [
      {
        label: "Links Institucionales",
        href: "https://iestphuanta.sistema.edu.pe/login/",
      },
      {
        label: "Noticias",
        href: "/noticias",
      },
    ],
  },
]

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Institución",
    links: [
      { label: "Presentación y Reseña", href: "/nosotros" },
      { label: "Misión y Visión al 2031", href: "/nosotros" },
      {
        label: "Licenciamiento (R.M. 0371-2025)",
        href: "/docs/Licenciamiento-RMN371-2025-MINEDU.pdf",
      },
      { label: "Organización Institucional", href: "/nosotros" },
      { label: "Proyecto Educativo (PEI)", href: "/docs/PEI-IESPH.pdf" },
      { label: "Manual de Puestos (MPP)", href: "/docs/MPP-IESPH.pdf" },
      { label: "TUPA Institucional (PDF)", href: "/docs/TUPA-IESPH.pdf" },
    ],
  },
  {
    title: "Académico",
    links: [
      {
        label: "Diseño y Programación Web",
        href: "/carreras/diseno-programacion-web",
      },
      {
        label: "Enfermería Técnica",
        href: "/carreras/enfermeria-tecnica",
      },
      {
        label: "Mecatrónica Automotriz",
        href: "/carreras/mecatronica-automotriz",
      },
      {
        label: "Industrias de Alimentos y Bebidas",
        href: "/carreras/industrias-alimentos-bebidas",
      },
      {
        label: "Producción Agropecuaria",
        href: "/carreras/produccion-agropecuaria",
      },
      { label: "Admisión 2026", href: "/admision" },
      {
        label: "Resultados Admisión 2026 (PDF)",
        href: "/docs/Resultado-Admision-2026.pdf",
      },
    ],
  },
  {
    title: "Portales y Enlaces",
    links: [
      {
        label: "Portal Estudiante (SIGAEST)",
        href: "https://iestphuanta.sistema.edu.pe/login/",
      },
      {
        label: "Portal Docente (SISPA)",
        href: "https://sispa.iestphuanta.edu.pe/docente/login/",
      },
      {
        label: "Bolsa de Empleo (AVANZA)",
        href: "https://avanza.minedu.gob.pe/",
      },
      {
        label: "Ministerio de Educación (MINEDU)",
        href: "https://www.gob.pe/minedu",
      },
      { label: "DRE Ayacucho (DREA)", href: "http://drea.gob.pe" },
      { label: "PRONABEC / Beca 18", href: "https://www.gob.pe/pronabec" },
      { label: "Portal de Transparencia", href: "/transparencia" },
    ],
  },
]
