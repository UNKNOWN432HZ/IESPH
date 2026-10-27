import { useState } from "react"
import logoIES from "@/assets/logo.webp"
import {
  IconMapPin,
  IconPhone,
  MorphMenuToggle,
  MorphThemeToggle,
} from "@/components/icons/Icons"
import { INSTITUTION_CONTACT } from "@/data/institution"
import { MAIN_NAV_ITEMS, TOP_NAV_LINKS } from "@/data/navigation"
import { useTheme } from "@/hooks/useTheme"
import { navigateTo } from "@/utils/navigation"

interface HeaderProps {
  onOpenApplyModal?: () => void
  onOpenComplaintsModal?: () => void
}

export default function Header({
  onOpenApplyModal,
  onOpenComplaintsModal,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<
    string | null
  >(null)
  const { theme, toggleTheme } = useTheme()

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setActiveDropdown(null)
    setMobileActiveDropdown(null)
    setMobileMenuOpen(false)

    if (
      href === "/libro-de-reclamaciones" ||
      href === "#libro-de-reclamaciones"
    ) {
      e.preventDefault()
      onOpenComplaintsModal?.()
      return
    }

    if (href.startsWith("http://") || href.startsWith("https://")) {
      return
    }

    e.preventDefault()
    navigateTo(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-xs font-sans transition-colors w-full overflow-x-clip">
      {/* ── Top Utility Bar: Solo en tablets y escritorios (hidden sm:block) ───────────────── */}
      <div className="hidden sm:block bg-slate-100 dark:bg-[#0b1a2c] text-slate-600 dark:text-slate-300 text-xs py-1.5 sm:py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-800/80 transition-colors">
        <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between gap-3">
          {/* Contact info with clean SVGs */}
          <div className="flex items-center gap-2.5 sm:gap-5 text-xs">
            <a
              href={`tel:${INSTITUTION_CONTACT.phoneRaw}`}
              className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 hover:text-blue-900 dark:hover:text-white transition-colors py-0.5 group font-medium"
            >
              <IconPhone className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0 group-hover:scale-105 transition-transform" />
              <span>{INSTITUTION_CONTACT.phone}</span>
            </a>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
              <IconMapPin className="w-3.5 h-3.5 text-slate-400 dark:text-sky-300 shrink-0" />
              <span>{INSTITUTION_CONTACT.address}</span>
            </span>
          </div>

          {/* Right: Direct institutional links */}
          <div className="flex items-center gap-3 text-xs">
            {/* Quick role links on mobile */}
            <div className="flex sm:hidden items-center gap-2 text-[11px]">
              {TOP_NAV_LINKS.map((link, idx) => {
                const isExternal =
                  link.href.startsWith("http://") ||
                  link.href.startsWith("https://")
                return (
                  <span key={link.label} className="flex items-center gap-2">
                    {idx > 0 && (
                      <span className="text-slate-300 dark:text-slate-700">
                        ·
                      </span>
                    )}
                    <a
                      href={link.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      onClick={
                        isExternal
                          ? undefined
                          : (e) => handleNavClick(e, link.href)
                      }
                      className="text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-white font-medium transition-colors"
                    >
                      {link.label}
                    </a>
                  </span>
                )
              })}
            </div>

            {/* Role links on desktop */}
            <div className="hidden sm:flex items-center gap-3 md:gap-4">
              {TOP_NAV_LINKS.map((link) => {
                const isExternal =
                  link.href.startsWith("http://") ||
                  link.href.startsWith("https://")
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    onClick={
                      isExternal
                        ? undefined
                        : (e) => handleNavClick(e, link.href)
                    }
                    className="text-slate-600 dark:text-slate-300 hover:text-blue-900 dark:hover:text-white transition-colors font-medium py-0.5"
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Bar ────────────────────────────────────────── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand identity */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, "/")}
          className="flex items-center gap-2 sm:gap-3.5 shrink-0 group py-1"
        >
          <img
            src={logoIES}
            alt="Logo Instituto de Educación Superior Público Huanta"
            className="h-10 sm:h-12 lg:h-11 xl:h-13 w-auto object-contain drop-shadow-xs transition-transform group-hover:scale-[1.02]"
          />
          {/* Solo visible en tablets y escritorios (>= sm). En móvil solo se muestra el logo */}
          <div className="hidden sm:block leading-tight">
            <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              INSTITUTO DE EDUCACIÓN SUPERIOR PÚBLICO
            </div>
            <div className="text-base sm:text-lg xl:text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-blue-900 dark:group-hover:text-sky-400 transition-colors">
              HUANTA
            </div>
          </div>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 shrink-0">
          {MAIN_NAV_ITEMS.map((item) => {
            const isDropdownActive = activeDropdown === item.label
            const isNosotros = item.label === "Nosotros"

            return (
              <div
                key={item.label}
                className="relative shrink-0 py-2"
                onMouseEnter={() =>
                  item.children && setActiveDropdown(item.label)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {/* Active/Hover Top Gradient Bar (as in Image 2) */}
                {isDropdownActive && (
                  <span className="absolute top-0 left-2 right-2 h-0.75 bg-linear-to-r from-[#1475F7] to-[#7114EF] rounded-full" />
                )}

                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-2 xl:px-2.5 2xl:px-3.5 py-1.5 xl:py-2 rounded-lg text-xs 2xl:text-sm font-semibold transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                    isDropdownActive
                      ? "text-[#7114EF] dark:text-[#08D9FF] bg-purple-50/60 dark:bg-slate-800/80"
                      : "text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.children && (
                    <svg
                      className={`w-3 h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-200 ${
                        isDropdownActive
                          ? "rotate-180 text-[#7114EF] dark:text-[#08D9FF]"
                          : "text-slate-400"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </a>

                {/* Dropdown Menu (Styled faithfully according to Image 2) */}
                {item.children && isDropdownActive && (
                  <div
                    className={`absolute top-full left-0 z-50 pt-1.5 ${
                      isNosotros ? "w-64" : "w-72"
                    }`}
                  >
                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden">
                      {/* Top gradient accent line on the dropdown panel */}
                      <div className="h-0.75 w-full bg-linear-to-r from-[#1475F7] to-[#7114EF]" />
                      <div className="p-1.5 space-y-0.5">
                        {item.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            onClick={(e) => handleNavClick(e, child.href)}
                            className="block px-3.5 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all group"
                          >
                            <div className="text-[13px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#7114EF] dark:group-hover:text-[#08D9FF] transition-colors">
                              {child.label}
                            </div>
                            {!isNosotros && child.description && (
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                                {child.description}
                              </div>
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Theme Toggle, Action Button & Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Selector de Tema (Modo Claro / Oscuro) con morphing */}
          <button
            onClick={toggleTheme}
            type="button"
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors shrink-0"
            aria-label={
              theme === "dark"
                ? "Cambiar a modo claro"
                : "Cambiar a modo oscuro"
            }
            title={
              theme === "dark"
                ? "Cambiar a modo claro"
                : "Cambiar a modo oscuro"
            }
          >
            <MorphThemeToggle
              isDark={theme === "dark"}
              className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${
                theme === "dark" ? "text-amber-400" : "text-slate-700"
              }`}
            />
          </button>

          <a
            href="/postular"
            onClick={(e) => {
              e.preventDefault()
              onOpenApplyModal?.()
            }}
            className="inline-flex items-center gap-1.5 bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-500 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 sm:py-2.5 min-h-9.5 sm:min-h-11 rounded-lg shadow-xs transition-colors shrink-0 whitespace-nowrap"
          >
            <span>Postula en Línea</span>
            <span>→</span>
          </a>

          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen)
              setMobileActiveDropdown(null)
            }}
            className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 cursor-pointer"
            aria-label="Menú principal de navegación"
            aria-expanded={mobileMenuOpen}
          >
            <MorphMenuToggle
              isOpen={mobileMenuOpen}
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </button>
        </div>
      </div>

      {/* ── Mobile Horizontal Navigation Strip: Clean standard text links matching desktop style ── */}
      <div className="lg:hidden bg-slate-50/95 dark:bg-slate-900/95 border-t border-slate-200/80 dark:border-slate-800 overflow-x-auto scrollbar-none px-3 py-2 transition-colors">
        <div className="flex items-center gap-1 sm:gap-2 min-w-max text-xs font-semibold">
          {MAIN_NAV_ITEMS.map((item) => {
            const hasChildren = Boolean(
              item.children && item.children.length > 0,
            )
            const isOpen = mobileActiveDropdown === item.label

            return (
              <div key={item.label} className="relative shrink-0">
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() =>
                      setMobileActiveDropdown(isOpen ? null : item.label)
                    }
                    className={`px-2.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                      isOpen
                        ? "text-blue-900 dark:text-sky-400 bg-blue-50/80 dark:bg-slate-800"
                        : "text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <span>{item.shortLabel ?? item.label}</span>
                    <svg
                      className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                        isOpen
                          ? "rotate-180 text-blue-900 dark:text-sky-400"
                          : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="px-2.5 py-1.5 rounded-md text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/60 transition-colors inline-block"
                  >
                    {item.shortLabel ?? item.label}
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Overlay to close mobile dropdown when tapping outside ── */}
      {mobileActiveDropdown && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setMobileActiveDropdown(null)}
        />
      )}

      {/* ── Mobile Floating Dropdown Card (Idéntico al de escritorio, sin botón 'Cerrar', interactivo con hover) ── */}
      {mobileActiveDropdown && (
        <div className="lg:hidden absolute left-3 z-50 w-72 max-w-[calc(100vw-24px)] pt-1">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden">
            <div className="h-0.75 w-full bg-linear-to-r from-[#1475F7] to-[#7114EF]" />
            <div className="p-1.5 space-y-0.5">
              {MAIN_NAV_ITEMS.find(
                (i) => i.label === mobileActiveDropdown,
              )?.children?.map((child) => (
                <a
                  key={child.label}
                  href={child.href}
                  onClick={(e) => handleNavClick(e, child.href)}
                  className="block px-3.5 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors group"
                >
                  <div className="text-[13px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#7114EF] dark:group-hover:text-[#08D9FF] transition-colors">
                    {child.label}
                  </div>
                  {mobileActiveDropdown !== "Nosotros" && child.description && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {child.description}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Institutional color accent line connecting header to page content */}
      <div className="h-[2.5px] w-full bg-linear-to-r from-[#7114EF] via-[#1475F7] to-[#08D9FF]" />

      {/* ── Mobile Menu Drawer ─────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-4 max-h-[85vh] overflow-y-auto space-y-4 shadow-xl text-slate-900 dark:text-slate-100">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Navegación Institucional
            </span>
            <span className="text-slate-600 dark:text-slate-300 text-xs font-medium">
              Licenciado MINEDU
            </span>
          </div>

          {/* Theme switcher inside mobile drawer */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200">
            <span>
              Tema ({theme === "dark" ? "Modo Oscuro" : "Modo Claro"})
            </span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 shadow-2xs border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100"
            >
              <MorphThemeToggle
                isDark={theme === "dark"}
                className={`w-4 h-4 ${
                  theme === "dark" ? "text-amber-400" : "text-slate-700"
                }`}
              />
              <span>{theme === "dark" ? "Modo Claro" : "Modo Oscuro"}</span>
            </button>
          </div>

          <div className="space-y-1">
            {MAIN_NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="border-b border-slate-100 dark:border-slate-800 pb-1"
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center min-h-11 py-2 text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-blue-900 dark:hover:text-sky-400"
                >
                  {item.label}
                </a>
                {item.children && (
                  <div className="pl-3 space-y-1 border-l-2 border-slate-200 dark:border-slate-700 ml-1 mb-2">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        onClick={(e) => handleNavClick(e, child.href)}
                        className="flex items-center min-h-9 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-sky-400"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Role Quick Links */}
          <div className="pt-2 sm:hidden border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Accesos Institucionales
            </span>
            <div className="grid grid-cols-2 gap-2">
              {TOP_NAV_LINKS.map((link) => {
                const isExternal =
                  link.href.startsWith("http://") ||
                  link.href.startsWith("https://")
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                      setMobileMenuOpen(false)
                      if (!isExternal) {
                        handleNavClick(e, link.href)
                      }
                    }}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                  >
                    <span>{link.label}</span>
                  </a>
                )
              })}
            </div>
          </div>

          <div className="pt-2">
            <a
              href="/postular"
              onClick={(e) => {
                e.preventDefault()
                setMobileMenuOpen(false)
                onOpenApplyModal?.()
              }}
              className="flex items-center justify-center gap-2 w-full bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-500 text-white font-bold py-3 min-h-11 rounded-xl text-center text-sm shadow-md"
            >
              <span>Postula en Línea</span>
              <span>→</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
