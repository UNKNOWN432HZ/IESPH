import { useEffect, useState } from "react"
import logoIES from "@/assets/logo.webp"
import {
  IconFacebook,
  IconLocationMap,
  IconMail,
  IconPhone,
  MorphMenuToggle,
  MorphThemeToggle,
} from "@/components/icons/Icons"
import { INSTITUTION_CONTACT } from "@/data/institution"
import { MAIN_NAV_ITEMS } from "@/data/navigation"
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
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  // Detección reactiva de scroll para persistencia visual idéntica a la web original
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

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

    if (href === "/postular" || href === "#postular") {
      e.preventDefault()
      onOpenApplyModal?.()
      return
    }

    if (href.startsWith("http://") || href.startsWith("https://")) {
      return
    }

    e.preventDefault()
    navigateTo(href)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full font-sans transition-all duration-300 ${
        isScrolled
          ? "bg-white/98 dark:bg-slate-950/98 backdrop-blur-md shadow-[0_8px_16px_rgba(0,0,0,0.08)] border-b border-slate-200/80 dark:border-slate-800"
          : "bg-white dark:bg-slate-950 shadow-[0_6px_8px_rgba(0,0,0,0.06)]"
      }`}
    >
      {/* ── Top Utility Bar: Franja superior de contacto centrada ───────────────────────── */}
      <div
        className={`hidden sm:block transition-all duration-300 ease-in-out border-b border-slate-100/90 dark:border-slate-800/80 ${
          isScrolled
            ? "max-h-0 opacity-0 overflow-hidden py-0 border-transparent"
            : "max-h-12 opacity-100 py-2.5 px-4 bg-white dark:bg-slate-900"
        }`}
      >
        <div className="w-full flex items-center justify-center gap-4 md:gap-6 text-[13px] md:text-[14px] text-[#556377] dark:text-slate-300 font-medium">
          {/* Teléfono institucional */}
          <a
            href={`tel:${INSTITUTION_CONTACT.phoneRaw}`}
            className="flex items-center gap-1.5 hover:text-[#7114EF] dark:hover:text-[#08D9FF] transition-colors py-0.5 group"
          >
            <IconPhone className="w-3.5 h-3.5 text-[#7114EF] dark:text-[#08D9FF] shrink-0 group-hover:scale-110 transition-transform" />
            <span>{INSTITUTION_CONTACT.phone}</span>
          </a>

          <span className="text-slate-200 dark:text-slate-700">|</span>

          {/* Dirección institucional con mapa */}
          <span className="flex items-center gap-1.5">
            <IconLocationMap className="w-4 h-4 text-[#1475F7] dark:text-[#08D9FF] shrink-0" />
            <span>{INSTITUTION_CONTACT.address}</span>
          </span>

          <span className="text-slate-200 dark:text-slate-700">|</span>

          {/* Correo oficial */}
          <a
            href="mailto:contactos@iestphuanta.edu.pe"
            className="flex items-center gap-1.5 hover:text-[#1475F7] dark:hover:text-[#08D9FF] transition-colors py-0.5"
          >
            <IconMail className="w-3.5 h-3.5 text-[#1475F7] shrink-0" />
            <span>contactos@iestphuanta.edu.pe</span>
          </a>

          <span className="text-slate-200 dark:text-slate-700">|</span>

          {/* Facebook institucional */}
          <a
            href={INSTITUTION_CONTACT.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#556377] hover:text-[#1877F2] dark:hover:text-[#08D9FF] transition-colors p-0.5"
            aria-label="Facebook Institucional"
            title="Facebook Institucional"
          >
            <IconFacebook className="w-3.5 h-3.5" />
          </a>

          {/* Selector de Tema discreto */}
          <button
            onClick={toggleTheme}
            type="button"
            className="ml-2 w-6 h-6 flex items-center justify-center rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
              className={`w-3.5 h-3.5 ${
                theme === "dark" ? "text-amber-400" : "text-slate-600"
              }`}
            />
          </button>
        </div>
      </div>

      {/* ── Main Navigation Bar: Diseño exacto al portal original ───────────────── */}
      <div
        className={`w-full border-t-2 border-[#F1F3F5] dark:border-slate-800/80 bg-white dark:bg-slate-950 transition-all duration-300 ${
          isScrolled ? "h-16 lg:h-18" : "h-18 lg:h-20"
        }`}
      >
        <div className="w-full flex items-center h-full">
          {/* Insignia poligonal azul-púrpura pegada al borde izquierdo (idéntica a la original) */}
          <div className="relative h-full flex items-center pl-4 sm:pl-6 lg:pl-8 pr-10 sm:pr-12 lg:pr-14 bg-linear-to-r from-[#1475F7] to-[#7114EF] [clip-path:polygon(0_0,calc(100%-28px)_0,100%_100%,0_100%)] shrink-0 shadow-sm transition-all duration-300">
            <a
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="flex items-center group py-1"
              aria-label="Página de inicio - IESP Huanta"
            >
              <img
                src={logoIES}
                alt="Logo Instituto de Educación Superior Público Huanta"
                className="h-8 sm:h-9 lg:h-10 w-auto object-contain drop-shadow-xs transition-all duration-300 group-hover:scale-105"
              />
            </a>
          </div>

          {/* Menú de Navegación de Escritorio: Posicionado inmediatamente junto a la insignia */}
          <div className="flex-1 hidden lg:flex items-center h-full ml-3 xl:ml-6 overflow-x-hidden">
            <nav className="flex items-center h-full gap-1 xl:gap-2.5 2xl:gap-4">
              {MAIN_NAV_ITEMS.map((item) => {
                const isDropdownActive = activeDropdown === item.label
                const hasChildren = Boolean(
                  item.children && item.children.length > 0,
                )

                return (
                  <div
                    key={item.label}
                    className="relative h-full flex items-center"
                    onMouseEnter={() =>
                      hasChildren && setActiveDropdown(item.label)
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`relative flex items-center gap-1 h-full px-2 xl:px-3 text-[14px] xl:text-[15px] font-semibold tracking-normal transition-colors whitespace-nowrap cursor-pointer ${
                        isDropdownActive
                          ? "text-[#7114EF] dark:text-[#08D9FF]"
                          : "text-[#101130] dark:text-slate-100 hover:text-[#7114EF] dark:hover:text-[#08D9FF]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {hasChildren && (
                        <svg
                          className={`w-2.5 h-2.5 transition-transform duration-200 ${
                            isDropdownActive
                              ? "rotate-180 text-[#7114EF] dark:text-[#08D9FF]"
                              : "text-[#101130]/60 dark:text-slate-400"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}

                      {/* Barra inferior de degradado institucional al estar activo o en hover */}
                      {isDropdownActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#7114EF] to-[#1475F7] rounded-full shadow-[0_4px_8px_rgba(113,20,239,0.5)]" />
                      )}
                    </a>

                    {/* Submenú desplegable oficial */}
                    {hasChildren && isDropdownActive && (
                      <div
                        className={`absolute top-full left-0 z-50 pt-1 ${
                          item.label === "Nosotros"
                            ? "w-64"
                            : item.label === "Programas de estudios"
                              ? "w-80"
                              : "w-72"
                        }`}
                      >
                        <div className="bg-white dark:bg-slate-900 rounded-b-md shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-100 dark:border-slate-800 overflow-hidden">
                          <div className="h-0.75 w-full bg-linear-to-r from-[#7114EF] to-[#1475F7]" />
                          <div className="py-2">
                            {item.children?.map((child) => (
                              <a
                                key={child.label}
                                href={child.href}
                                onClick={(e) => handleNavClick(e, child.href)}
                                className="block px-5 py-2.5 text-[14px] font-medium text-[#101130] dark:text-slate-200 hover:text-[#1475F7] dark:hover:text-[#08D9FF] hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors"
                              >
                                {child.label}
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
          </div>

          {/* Controles para dispositivos móviles y tablets (< lg) */}
          <div className="lg:hidden flex items-center gap-2 pr-4 ml-auto">
            <button
              onClick={toggleTheme}
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors shrink-0"
              aria-label={
                theme === "dark"
                  ? "Cambiar a modo claro"
                  : "Cambiar a modo oscuro"
              }
            >
              <MorphThemeToggle
                isDark={theme === "dark"}
                className={`w-4.5 h-4.5 ${
                  theme === "dark" ? "text-amber-400" : "text-slate-700"
                }`}
              />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen)
                setMobileActiveDropdown(null)
              }}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
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
      </div>

      {/* ── Mobile Horizontal Navigation Strip ───────────────────────────── */}
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
                        ? "text-[#7114EF] dark:text-[#08D9FF] bg-purple-50 dark:bg-slate-800"
                        : "text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <span>{item.shortLabel ?? item.label}</span>
                    <svg
                      className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                        isOpen
                          ? "rotate-180 text-[#7114EF] dark:text-[#08D9FF]"
                          : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
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

      {/* ── Mobile Floating Dropdown Card ── */}
      {mobileActiveDropdown && (
        <div className="lg:hidden absolute left-3 z-50 w-72 max-w-[calc(100vw-24px)] pt-1">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden">
            <div className="h-0.75 w-full bg-linear-to-r from-[#7114EF] to-[#1475F7]" />
            <div className="p-1.5 space-y-0.5">
              {MAIN_NAV_ITEMS.find(
                (i) => i.label === mobileActiveDropdown,
              )?.children?.map((child) => (
                <a
                  key={child.label}
                  href={child.href}
                  onClick={(e) => handleNavClick(e, child.href)}
                  className="block px-3.5 py-2.5 rounded-lg hover:bg-purple-50/70 dark:hover:bg-slate-800/80 transition-colors group"
                >
                  <div className="text-[13px] font-bold text-slate-800 dark:text-slate-100 group-hover:text-[#7114EF] dark:group-hover:text-[#08D9FF] transition-colors">
                    {child.label}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile Menu Drawer ─────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-4 max-h-[85vh] overflow-y-auto space-y-4 shadow-xl text-slate-900 dark:text-slate-100">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Navegación Institucional
            </span>
            <span className="text-[#7114EF] dark:text-[#08D9FF] text-xs font-bold">
              Licenciado MINEDU
            </span>
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
                  className="flex items-center min-h-11 py-2 text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-[#7114EF] dark:hover:text-[#08D9FF]"
                >
                  {item.label}
                </a>
                {item.children && (
                  <div className="pl-3 space-y-1 border-l-2 border-purple-200 dark:border-purple-800 ml-1 mb-2">
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        onClick={(e) => handleNavClick(e, child.href)}
                        className="flex items-center min-h-9 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-[#7114EF] dark:hover:text-[#08D9FF]"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Acceso rápido a postulación en móvil */}
          <div className="pt-2">
            <a
              href="/postular"
              onClick={(e) => {
                e.preventDefault()
                setMobileMenuOpen(false)
                onOpenApplyModal?.()
              }}
              className="flex items-center justify-center gap-2 w-full bg-linear-to-r from-[#1475F7] to-[#7114EF] hover:opacity-95 text-white font-bold py-3 min-h-11 rounded-xl text-center text-sm shadow-md"
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
