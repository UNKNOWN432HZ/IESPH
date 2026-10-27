import { lazy, Suspense, useEffect, useState } from "react"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import AdmissionSection from "@/components/sections/AdmissionSection"
import CareersSection from "@/components/sections/CareersSection"
import CtaBanner from "@/components/sections/CtaBanner"
import HeroSection from "@/components/sections/HeroSection"
import InstitutionalSection from "@/components/sections/InstitutionalSection"
import NewsSection from "@/components/sections/NewsSection"
import ServicesSection from "@/components/sections/ServicesSection"
import StatsStrip from "@/components/sections/StatsStrip"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection"
import CareerDetailPage from "@/pages/CareerDetailPage"
import { navigateTo, scrollToTop } from "@/utils/navigation"

// Lazy loading diferido bajo demanda para modales interactivos
const AdmissionModal = lazy(() => import("@/components/modals/AdmissionModal"))
const ComplaintsBookModal = lazy(
  () => import("@/components/modals/ComplaintsBookModal"),
)
const VideoModal = lazy(() => import("@/components/modals/VideoModal"))
const PaperPlaneAnnouncementModal = lazy(
  () => import("@/components/modals/PaperPlaneAnnouncementModal"),
)

export default function App() {
  const [currentCareerId, setCurrentCareerId] = useState<string | null>(null)
  const [complaintsModalOpen, setComplaintsModalOpen] = useState(false)
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false)
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false)
  const [selectedCareerForApply, setSelectedCareerForApply] = useState<
    string | undefined
  >()
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  // Listen for clean path navigation and browser back/forward (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      const hash = window.location.hash

      if (path.startsWith("/carreras/")) {
        const careerId = path.replace(/^\/carreras\//, "").replace(/\/$/, "")
        setCurrentCareerId(careerId)
        setComplaintsModalOpen(false)
        setAdmissionModalOpen(false)
        scrollToTop()
      } else {
        setCurrentCareerId(null)

        if (
          path === "/libro-de-reclamaciones" ||
          hash === "#libro-de-reclamaciones"
        ) {
          setComplaintsModalOpen(true)
        } else if (path === "/postular" || hash === "#postular") {
          setAdmissionModalOpen(true)
        } else if (path === "/comunicado" || hash === "#comunicado") {
          setAnnouncementModalOpen(true)
        } else {
          setComplaintsModalOpen(false)
          const targetId = hash
            ? hash.replace(/^#/, "")
            : path !== "/" && path !== ""
              ? path.replace(/^\//, "")
              : null

          if (targetId) {
            const attemptScroll = (attempts = 0) => {
              const el = document.getElementById(targetId)
              if (el) {
                el.scrollIntoView({ behavior: "smooth" })
              } else if (attempts < 15) {
                setTimeout(() => attemptScroll(attempts + 1), 50)
              }
            }
            requestAnimationFrame(() => attemptScroll())
          } else {
            scrollToTop()
          }
        }
      }
    }

    const handleOpenModal = () => {
      setComplaintsModalOpen(true)
    }

    const handleOpenAnnouncement = () => {
      setAnnouncementModalOpen(true)
    }

    // Handle initial route on mount
    handlePopState()

    window.addEventListener("popstate", handlePopState)
    window.addEventListener("open-complaints-modal", handleOpenModal)
    window.addEventListener("open-announcement-modal", handleOpenAnnouncement)

    // Global click interceptor for clean internal paths (/carreras, /admision, etc.)
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a")
      if (!target) return
      const href = target.getAttribute("href")
      if (
        href?.startsWith("/") &&
        !href.startsWith("//") &&
        !target.hasAttribute("download") &&
        target.target !== "_blank"
      ) {
        e.preventDefault()
        navigateTo(href)
      }
    }

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    document.addEventListener("click", handleDocumentClick)

    return () => {
      window.removeEventListener("popstate", handlePopState)
      window.removeEventListener("open-complaints-modal", handleOpenModal)
      window.removeEventListener(
        "open-announcement-modal",
        handleOpenAnnouncement,
      )
      document.removeEventListener("click", handleDocumentClick)
    }
  }, [])

  // Auto-disparo elegante del comunicado tras 1.8 segundos en la primera visita de sesión
  useEffect(() => {
    if (window.location.pathname.startsWith("/carreras/")) return

    const hasSeen = sessionStorage.getItem("iesph_announcement_seen")
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setAnnouncementModalOpen(true)
        sessionStorage.setItem("iesph_announcement_seen", "true")
      }, 1800)
      return () => clearTimeout(timer)
    }
  }, [])

  // Guarantee instant scroll reset when navigating between career pages
  useEffect(() => {
    if (currentCareerId !== undefined) {
      scrollToTop()
    }
  }, [currentCareerId])

  const handleOpenApplyModal = (careerName?: string) => {
    setSelectedCareerForApply(careerName)
    setAdmissionModalOpen(true)
  }

  return (
    <div className="min-h-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-600 selection:text-white flex flex-col transition-colors">
      {/* ── Main Site Header ────────────────────────────────────────── */}
      <Header
        onOpenApplyModal={() => handleOpenApplyModal()}
        onOpenComplaintsModal={() => setComplaintsModalOpen(true)}
      />

      {/* ── Main Content: Página de Carrera Dedicada o Landing Page ──── */}
      <main className="flex-1">
        {currentCareerId ? (
          <CareerDetailPage key={currentCareerId} careerId={currentCareerId} />
        ) : (
          <>
            {/* Hero Section con 5 programas destacados y enlaces del Estado */}
            <HeroSection
              onCareerSelect={(careerName) => handleOpenApplyModal(careerName)}
              onOpenApplyModal={() => handleOpenApplyModal()}
              onOpenVideoModal={() => setVideoModalOpen(true)}
              onOpenAnnouncementModal={() => setAnnouncementModalOpen(true)}
            />

            {/* Franja de Métricas Institucionales */}
            <StatsStrip />

            {/* 5 Programas de Estudio Licenciados (Tabs y Enlaces Dedicados) */}
            <CareersSection
              onApplyForCareer={(careerName) =>
                handleOpenApplyModal(careerName)
              }
            />

            {/* Presentación Institucional y Misión / Visión (#presentacion y mision-vision) */}
            <WhyChooseUsSection
              onOpenVideoModal={() => setVideoModalOpen(true)}
            />

            {/* Secciones Institucionales Nativas: Organización, Plana Jerárquica, Plana Docente y Locales */}
            <InstitutionalSection />

            {/* 4 Pasos del Proceso de Admisión y Requisitos */}
            <AdmissionSection onStartApply={() => handleOpenApplyModal()} />

            {/* Infraestructura de Talleres y Servicios Especializados */}
            <ServicesSection />

            {/* Noticias y Comunicados Oficiales */}
            <NewsSection />

            {/* Testimonios Reales de Egresados y Estudiantes */}
            <TestimonialsSection />

            {/* Banner de Llamado a la Postulación */}
            <CtaBanner onApplyClick={() => handleOpenApplyModal()} />
          </>
        )}
      </main>

      {/* ── Site Footer ─────────────────────────────────────────────── */}
      <Footer onOpenComplaintsModal={() => setComplaintsModalOpen(true)} />

      {/* ── Modales cargados bajo demanda con Suspense ───────────── */}
      <Suspense fallback={null}>
        {announcementModalOpen && (
          <PaperPlaneAnnouncementModal
            isOpen={announcementModalOpen}
            onClose={() => {
              setAnnouncementModalOpen(false)
              if (
                window.location.pathname === "/comunicado" ||
                window.location.hash === "#comunicado"
              ) {
                window.history.pushState(null, "", "/")
              }
            }}
            onActionClick={() => {
              const el = document.getElementById("noticias")
              if (el) el.scrollIntoView({ behavior: "smooth" })
            }}
          />
        )}

        {admissionModalOpen && (
          <AdmissionModal
            isOpen={admissionModalOpen}
            initialCareer={selectedCareerForApply}
            onClose={() => {
              setAdmissionModalOpen(false)
              if (
                window.location.pathname === "/postular" ||
                window.location.hash === "#postular"
              ) {
                window.history.pushState(null, "", "/")
              }
            }}
          />
        )}

        {videoModalOpen && (
          <VideoModal
            isOpen={videoModalOpen}
            onClose={() => setVideoModalOpen(false)}
          />
        )}

        {complaintsModalOpen && (
          <ComplaintsBookModal
            isOpen={complaintsModalOpen}
            onClose={() => {
              setComplaintsModalOpen(false)
              if (
                window.location.pathname === "/libro-de-reclamaciones" ||
                window.location.hash === "#libro-de-reclamaciones"
              ) {
                window.history.pushState(null, "", "/")
              }
            }}
          />
        )}
      </Suspense>
    </div>
  )
}
