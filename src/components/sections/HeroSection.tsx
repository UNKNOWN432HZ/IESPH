import {
  CarFront,
  ChevronLeft,
  ChevronRight,
  Code2,
  FlaskConical,
  Maximize2,
  Play,
  Send,
  Stethoscope,
  TreePine,
  Volume2,
  VolumeX,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import egresadoHero from "@/assets/egresado-hero.jpg"
import egresadosHero from "@/assets/egresados-hero.png"
import bgSlider from "@/assets/h2-bg-slider2-3-1.jpg"
import videoInstitucional from "@/assets/video-institucional.mp4"
import ConstellationGrid from "@/components/ui/constellation-grid"
import { CAREERS } from "@/data/careers"
import { navigateTo } from "@/utils/navigation"

interface HeroSectionProps {
  onCareerSelect?: (careerName: string) => void
  onOpenApplyModal?: () => void
  onOpenVideoModal?: () => void
  onOpenAnnouncementModal?: () => void
}

interface HeroSlide {
  id: string
  type: "image" | "video"
  badge: string
  title: string
  highlight?: string
  description: string
  image?: string
  videoSrc?: string
  alt: string
  imagePosition?: string
  tag: string
  ctaSecondaryText: string
  ctaSecondaryHref: string
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "calidad-licenciada",
    type: "image",
    badge: 'INSTITUTO DE EDUCACIÓN SUPERIOR PÚBLICO "HUANTA"',
    title: "Construye tu futuro con",
    highlight: "formación de calidad",
    description:
      "El Instituto de Educación Superior Público Huanta se enorgullece de ser un instituto licenciado, lo que garantiza que nuestros programas académicos cumplen con los más altos estándares de calidad establecidos por las autoridades educativas.",
    image: egresadoHero,
    alt: "Estudiante graduado con toga oficial y diploma del IESPH",
    imagePosition: "object-[78%_center]",
    tag: "Instituto Licenciado",
    ctaSecondaryText: "Conócenos",
    ctaSecondaryHref: "#presentacion",
  },
  {
    id: "excelencia-educativa",
    type: "image",
    badge: "Somos una institución educativa de excelencia ~",
    title: "Piensa en grande.",
    highlight: "¡Hacemos lo imposible posible!",
    description:
      "Nuestro compromiso es brindarte una educación de calidad que te prepare para enfrentar los desafíos del mercado laboral actual con formación técnica de primer nivel.",
    image: bgSlider,
    alt: "Estudiante del IESPH en el campus institucional",
    imagePosition: "object-[80%_center]",
    tag: "Excelencia Educativa",
    ctaSecondaryText: "Sobre Nosotros",
    ctaSecondaryHref: "#presentacion",
  },
  {
    id: "video-institucional",
    type: "video",
    badge: "Campus y Experiencia IESPH",
    title: "Conoce nuestra institución",
    highlight: "en video oficial",
    description:
      "Recorre nuestras modernas instalaciones, talleres de especialidad, laboratorios de cómputo y conoce a la comunidad que lidera la educación superior tecnológica en Huanta.",
    videoSrc: videoInstitucional,
    alt: "Video institucional oficial del Instituto de Educación Superior Público Huanta",
    tag: "Video Institucional",
    ctaSecondaryText: "Ver Instalaciones",
    ctaSecondaryHref: "#servicios",
  },
  {
    id: "comunidad-egresados",
    type: "image",
    badge: "Comunidad y Egresados de Éxito",
    title: "Tu meta profesional",
    highlight: "a un paso de ser realidad",
    description:
      "Titulados con certificación oficial a nombre de la Nación. Más de 39 años formando profesionales de excelencia con educación 100% pública y gratuita en Huanta.",
    image: egresadosHero,
    alt: "Ceremonia de graduación de egresados del IESPH",
    imagePosition: "object-center",
    tag: "Graduación y Titulación",
    ctaSecondaryText: "Ver Carreras",
    ctaSecondaryHref: "#carreras",
  },
]

export default function HeroSection({
  onCareerSelect,
  onOpenApplyModal,
  onOpenVideoModal,
  onOpenAnnouncementModal,
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [videoProgress, setVideoProgress] = useState(0)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Auto-slide interval (solamente corre en diapositivas con fotos; en el video se espera a que termine completo)
  useEffect(() => {
    if (isPaused) return

    // Si la diapositiva actual es video, NO cambiamos por temporizador: dejamos que termine
    if (HERO_SLIDES[currentSlide].type === "video") return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPaused, currentSlide])

  // Manage video play/pause when sliding
  useEffect(() => {
    const video = videoRef.current
    setVideoProgress(0)
    if (!video) return

    if (HERO_SLIDES[currentSlide].type === "video") {
      video.currentTime = 0
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }, [currentSlide])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
    )
  }

  const handleTimeUpdate = () => {
    if (videoRef.current?.duration) {
      setVideoProgress(
        (videoRef.current.currentTime / videoRef.current.duration) * 100,
      )
    }
  }

  const handleVideoEnded = () => {
    // Al finalizar la reproducción completa del video, avanzamos naturalmente al siguiente slide
    nextSlide()
  }

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted
      videoRef.current.muted = nextMuted
      setIsMuted(nextMuted)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {})
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  const activeSlide = HERO_SLIDES[currentSlide]

  // Configuración de los 5 programas licenciados con iconos semánticos exactos
  const programCards = [
    {
      id: "diseno-programacion-web",
      name: "Diseño y Programación Web",
      badgeColor:
        "bg-purple-100 text-[#7114EF] dark:bg-purple-950/70 dark:text-purple-300 dark:ring-1 dark:ring-purple-500/30",
      icon: <Code2 className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />,
    },
    {
      id: "enfermeria-tecnica",
      name: "Enfermería Técnica",
      altName: "Enfermería Técnica",
      badgeColor:
        "bg-sky-100 text-[#1475F7] dark:bg-sky-950/70 dark:text-sky-300 dark:ring-1 dark:ring-sky-500/30",
      icon: (
        <Stethoscope className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
      ),
    },
    {
      id: "mecatronica-automotriz",
      name: "Mecatrónica Automotriz",
      altName: "Mecatrónica Automotriz",
      badgeColor:
        "bg-blue-100 text-blue-600 dark:bg-blue-950/70 dark:text-blue-300 dark:ring-1 dark:ring-blue-500/30",
      icon: <CarFront className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />,
    },
    {
      id: "industrias-alimentos-bebidas",
      name: "Industrias Alimentarias",
      altName: "Industrias de Alimentos y Bebidas",
      badgeColor:
        "bg-amber-100 text-amber-600 dark:bg-amber-950/70 dark:text-amber-300 dark:ring-1 dark:ring-amber-500/30",
      icon: (
        <FlaskConical className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
      ),
    },
    {
      id: "produccion-agropecuaria",
      name: "Producción Agropecuaria",
      altName: "Producción Agropecuaria",
      badgeColor:
        "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/70 dark:text-emerald-300 dark:ring-1 dark:ring-emerald-500/30",
      icon: <TreePine className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />,
    },
  ]

  const handleCardClick = (cardId: string) => {
    navigateTo(`/carreras/${cardId}`)
    const career = CAREERS.find((c) => c.id === cardId)
    if (career) {
      if (onCareerSelect) onCareerSelect(career.name)
    }
  }

  return (
    <section className="relative font-sans bg-white dark:bg-slate-950 transition-colors pb-6 sm:pb-8">
      {/* ── 1. Hero Stage Principal con Gradiente y Acento Diagonal ──── */}
      <div className="relative bg-linear-to-r from-[#11244e] via-[#1a3875] to-[#2b519a] dark:from-[#050c19] dark:via-[#0a1628] dark:to-[#0f223a] text-white pt-10 pb-24 sm:pt-14 sm:pb-28 lg:pt-16 lg:pb-32 overflow-hidden transition-colors duration-300">
        {/* Constellation Grid Interactive Mesh with Synaptic Pulses */}
        <ConstellationGrid transparent className="z-0" />

        {/* Dynamic diagonal color band en la esquina superior derecha */}
        <div
          className="absolute -top-32 -right-24 sm:-top-40 sm:-right-20 w-137.5 sm:w-175 h-87.5 sm:h-112.5 bg-linear-to-bl from-[#7114EF] via-[#1475F7] to-transparent opacity-85 dark:opacity-40 dark:from-[#7114EF]/70 dark:via-[#1475F7]/40 rotate-[-22deg] pointer-events-none blur-[1px] transition-opacity duration-300"
          aria-hidden="true"
        />

        {/* Dynamic ambient lights con brillo sutil y armónico */}
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#1475F7]/20 dark:bg-[#1475F7]/12 rounded-full blur-3xl pointer-events-none transition-colors"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-10 right-10 w-80 h-80 bg-[#7114EF]/15 dark:bg-[#7114EF]/15 rounded-full blur-3xl pointer-events-none hidden sm:block transition-colors"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_1.1fr] xl:grid-cols-[1.05fr_1.15fr] gap-8 lg:gap-10 xl:gap-12 items-center">
            {/* Columna Izquierda: Información Institucional Dinámica */}
            <div className="space-y-5 text-left z-10">
              {/* Badge Institucional */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-white dark:text-slate-100 text-xs sm:text-sm font-semibold tracking-wide shadow-xs transition-all duration-300">
                <span>{activeSlide.badge}</span>
              </div>

              {/* Título Principal Sincronizado */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.15rem] font-black text-white leading-[1.14] tracking-tight transition-all duration-300 min-h-[3.8rem] sm:min-h-18">
                {activeSlide.title}{" "}
                {activeSlide.highlight && (
                  <>
                    <br className="hidden sm:inline" />
                    <span className="text-[#08D9FF] dark:text-[#08D9FF] dark:drop-shadow-[0_0_20px_rgba(8,217,255,0.4)]">
                      {activeSlide.highlight}
                    </span>
                  </>
                )}
              </h1>

              {/* Subtítulo / Descripción Institucional */}
              <p className="text-sm sm:text-base text-slate-200/90 dark:text-slate-300 max-w-xl leading-relaxed font-normal min-h-[4.2rem] transition-all duration-300">
                {activeSlide.description}
              </p>

              {/* Botones de Acción */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenApplyModal?.()}
                  className="btn-pill-gradient text-white font-bold text-xs sm:text-sm px-6 py-3.5 shadow-lg shadow-purple-950/40 hover:shadow-purple-600/30 dark:shadow-purple-950/70 dark:hover:shadow-purple-500/30 active:scale-[0.98] transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Postula</span>
                  <span>→</span>
                </button>

                <a
                  href={activeSlide.ctaSecondaryHref}
                  className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/15 text-white text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/20 hover:border-white/40 dark:border-white/15 dark:hover:border-white/25 transition-all cursor-pointer"
                >
                  {activeSlide.ctaSecondaryText}
                </a>

                {onOpenAnnouncementModal && (
                  <button
                    type="button"
                    onClick={() => onOpenAnnouncementModal()}
                    className="px-4 py-3.5 rounded-full bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/15 text-slate-100 hover:text-white text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/20 hover:border-white/35 transition-all cursor-pointer inline-flex items-center gap-2 shadow-xs group"
                  >
                    <Send className="w-3.5 h-3.5 text-[#08D9FF] group-hover:rotate-12 transition-transform" />
                    <span>Ver Comunicado</span>
                  </button>
                )}
              </div>
            </div>

            {/* Columna Derecha: Showcase de Imágenes y Video Institucional (Ampliado y Responsivo) */}
            <div className="relative flex justify-center items-center z-10 w-full">
              <div
                className="relative w-full max-w-105 sm:max-w-130 lg:max-w-145 xl:max-w-155 aspect-16/10 rounded-3xl overflow-hidden shadow-2xl dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)] border-2 border-white/20 dark:border-slate-800/80 bg-linear-to-b from-[#1475F7]/30 to-[#7114EF]/30 dark:from-slate-900/80 dark:to-slate-950/80 group select-none transition-all duration-300"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {HERO_SLIDES.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      idx === currentSlide
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    {slide.type === "video" ? (
                      <div className="relative w-full h-full bg-black">
                        <video
                          ref={videoRef}
                          src={slide.videoSrc}
                          muted={isMuted}
                          playsInline
                          onEnded={handleVideoEnded}
                          onTimeUpdate={handleTimeUpdate}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={togglePlay}
                        />

                        {/* Barra de progreso de reproducción del video */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 dark:bg-white/10 z-30 pointer-events-none">
                          <div
                            className="h-full bg-linear-to-r from-[#1475F7] to-[#08D9FF] transition-all duration-150"
                            style={{ width: `${videoProgress}%` }}
                          />
                        </div>

                        {/* Indicador de play/pause overlay central al pausar */}
                        {!isPlaying && (
                          <div
                            onClick={togglePlay}
                            className="absolute inset-0 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-xs cursor-pointer"
                          >
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1475F7]/90 text-white flex items-center justify-center shadow-xl border border-white/30 hover:scale-110 transition-transform">
                              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                            </div>
                          </div>
                        )}

                        {/* Barra de Controles Rápidos del Video */}
                        <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleMute()
                            }}
                            className="p-2 rounded-full bg-black/60 hover:bg-black/80 dark:bg-black/75 dark:hover:bg-black/90 text-white backdrop-blur-md border border-white/20 dark:border-white/10 transition-all cursor-pointer shadow-md"
                            title={
                              isMuted ? "Activar audio" : "Silenciar video"
                            }
                            aria-label={
                              isMuted ? "Activar sonido" : "Silenciar"
                            }
                          >
                            {isMuted ? (
                              <VolumeX className="w-4 h-4 text-slate-300" />
                            ) : (
                              <Volume2 className="w-4 h-4 text-[#08D9FF]" />
                            )}
                          </button>

                          {onOpenVideoModal && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                if (videoRef.current) {
                                  videoRef.current.pause()
                                  setIsPlaying(false)
                                }
                                onOpenVideoModal()
                              }}
                              className="p-2 rounded-full bg-black/60 hover:bg-black/80 dark:bg-black/75 dark:hover:bg-black/90 text-white backdrop-blur-md border border-white/20 dark:border-white/10 transition-all cursor-pointer shadow-md"
                              title="Ver en pantalla completa"
                              aria-label="Abrir video en pantalla completa"
                            >
                              <Maximize2 className="w-4 h-4 text-[#08D9FF]" />
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        className={`w-full h-full object-cover ${slide.imagePosition} group-hover:scale-105 transition-transform duration-700`}
                        loading={idx === 0 ? "eager" : "lazy"}
                      />
                    )}

                    {/* Gradiente inferior para legibilidad y badge informativo */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#0e1d3e]/95 via-[#0e1d3e]/20 to-transparent dark:from-slate-950/95 dark:via-slate-950/30 flex flex-col justify-end p-4 sm:p-5 pointer-events-none">
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#08D9FF] bg-[#08D9FF]/15 dark:bg-[#08D9FF]/20 backdrop-blur-md border border-[#08D9FF]/30 dark:border-[#08D9FF]/40 px-2.5 py-1 rounded-full w-fit mb-1 shadow-xs pointer-events-auto">
                        {slide.tag}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Controles de navegación manual (Flechas Anterior / Siguiente) */}
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Diapositiva anterior"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 dark:bg-black/70 dark:hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-md border border-white/20 dark:border-white/10 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Siguiente diapositiva"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 dark:bg-black/70 dark:hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-md border border-white/20 dark:border-white/10 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Indicadores de diapositiva interactivos */}
                <div className="absolute bottom-3.5 right-4 z-20 flex items-center gap-1.5 bg-black/50 dark:bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 dark:border-white/10">
                  {HERO_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentSlide
                          ? "w-5 bg-[#08D9FF]"
                          : "w-1.5 bg-white/40 hover:bg-white/75 dark:bg-white/30 dark:hover:bg-white/60"
                      }`}
                      aria-label={`Ver ${slide.tag}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Las 5 Tarjetas Blancas de Programas (Superpuestas) ──── */}
      <div className="relative -mt-14 sm:-mt-18 z-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {programCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="bg-white dark:bg-slate-900/95 dark:backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-xl hover:shadow-2xl dark:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.6)] dark:hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.85)] dark:hover:border-slate-700 hover:-translate-y-2 transition-all duration-300 cursor-pointer group flex flex-col items-center text-center justify-center min-h-38.75 sm:min-h-43.75"
            >
              {/* Contenedor del Icono Temático con Color Identificativo */}
              <div
                className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${card.badgeColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xs mb-3`}
              >
                {card.icon}
              </div>

              {/* Título del Programa Formativo */}
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-xs sm:text-sm group-hover:text-[#1475F7] dark:group-hover:text-[#08D9FF] transition-colors leading-tight">
                {card.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
