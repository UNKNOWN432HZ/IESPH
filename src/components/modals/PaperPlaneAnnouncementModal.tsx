import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Bell, Calendar, Sparkles, X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import admisionResImg from "@/assets/news/admision-resultados-2026.jpg"

interface PaperPlaneAnnouncementModalProps {
  isOpen: boolean
  onClose: () => void
  onActionClick?: () => void
}

type AnimationPhase =
  | "flight-in" // Avión vuela siempre de frente con la punta orientada hacia la derecha/avance
  | "unfolding" // Las solapas origami se despliegan en 3D
  | "open" // El comunicado está completamente abierto y legible
  | "folding" // Las solapas se repliegan cerrando la carta
  | "flight-out" // El avión despega con la punta orientada a 50° hacia la esquina superior derecha

export default function PaperPlaneAnnouncementModal({
  isOpen,
  onClose,
  onActionClick,
}: PaperPlaneAnnouncementModalProps) {
  const [phase, setPhase] = useState<AnimationPhase>("flight-in")

  // Manejo de la secuencia cinemática de entrada al abrir
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setPhase("flight-in")

      // Vuelo de entrada con la punta siempre por delante: 950ms
      const t1 = setTimeout(() => {
        setPhase("unfolding")
      }, 950)

      // Despliegue de solapas origami: 550ms adicionales
      const t2 = setTimeout(() => {
        setPhase("open")
      }, 1500)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }

    document.body.style.overflow = "unset"
  }, [isOpen])

  // Iniciar secuencia de cierre con repliegue origami y despegue
  const startCloseSequence = useCallback(() => {
    if (phase === "open") {
      setPhase("folding")

      // Plegado de solapas: 400ms
      const t1 = setTimeout(() => {
        setPhase("flight-out")
      }, 400)

      // Vuelo de salida balística con la punta orientada a 50°: 750ms
      const t2 = setTimeout(() => {
        onClose()
      }, 1150)

      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }

    onClose()
  }, [phase, onClose])

  // Atajo de teclado accesible con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && phase === "open") {
        startCloseSequence()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, phase, startCloseSequence])

  if (!isOpen) return null

  const isPlaneMode = phase === "flight-in" || phase === "flight-out"
  const isEnvelopeMode =
    phase === "unfolding" || phase === "open" || phase === "folding"

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Comunicado Oficial del IESPH"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden pointer-events-auto"
    >
      {/* ── Telón de Fondo (Backdrop con desenfoque) ────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isEnvelopeMode ? 1 : 0.4 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm cursor-pointer"
        onClick={() => {
          if (phase === "open") startCloseSequence()
        }}
        aria-hidden="true"
      />

      {/* ── FASE 1 & 5: AVIONCITO DE PAPEL CON VUELO AERODINÁMICO FRONTAL ── */}
      <AnimatePresence mode="wait">
        {isPlaneMode && (
          <motion.div
            key={`paper-plane-${phase}`}
            initial={
              phase === "flight-in"
                ? {
                    x: "-85vw",
                    y: "38vh",
                    scale: 0.35,
                    // La punta apunta a 68° hacia la derecha en la dirección del movimiento
                    rotate: 68,
                    rotateX: 20,
                    rotateY: -15,
                    opacity: 0,
                  }
                : {
                    x: "0vw",
                    y: "0vh",
                    scale: 0.95,
                    // En despegue, la punta apunta desde el inicio a 50° hacia arriba a la derecha
                    rotate: 50,
                    rotateX: -10,
                    rotateY: 15,
                    opacity: 1,
                  }
            }
            animate={
              phase === "flight-in"
                ? {
                    // Trayectoria en arco ascendente
                    x: ["-85vw", "-45vw", "-15vw", "0vw"],
                    y: ["38vh", "15vh", "2vh", "0vh"],
                    scale: [0.35, 0.75, 1.02, 1],
                    // La punta se mantiene SIEMPRE apuntando hacia la derecha y adelante durante todo el avance
                    rotate: [68, 66, 64, 62],
                    rotateX: [20, 16, 10, 5],
                    rotateY: [-15, -12, -8, -4],
                    opacity: [0, 1, 1, 1],
                  }
                : {
                    // Vuelo de salida: El avión sale disparado hacia la esquina superior derecha con la punta a 50°
                    x: ["0vw", "95vw"],
                    y: ["0vh", "-85vh"],
                    scale: [0.95, 0.35],
                    rotate: [50, 50],
                    rotateX: [-10, -18],
                    rotateY: [15, 20],
                    opacity: [1, 0],
                  }
            }
            transition={
              phase === "flight-in"
                ? {
                    duration: 0.95,
                    times: [0, 0.45, 0.8, 1],
                    ease: [0.16, 1, 0.3, 1],
                  }
                : {
                    duration: 0.75,
                    ease: [0.4, 0, 0.2, 1],
                  }
            }
            className="absolute z-30 pointer-events-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
          >
            {/* Gráfico Vectorial del Avión de Papel en Proporción Aerodinámica */}
            <svg
              width="240"
              height="240"
              viewBox="0 0 240 240"
              className="w-44 h-44 sm:w-56 sm:h-56 filter drop-shadow-xl"
              aria-hidden="true"
            >
              <defs>
                {/* Gradiente sutil para iluminación del papel */}
                <linearGradient
                  id="left-wing-grad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#f1f5f9" />
                </linearGradient>

                <linearGradient
                  id="right-wing-grad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#e2e8f0" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>

                <linearGradient
                  id="keel-shadow"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#64748b" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              <g transform="translate(120, 120)">
                {/* 1. Sombra de la quilla / fuselaje central inferior */}
                <polygon
                  points="0,-105 -5,80 0,95 5,80"
                  fill="url(#keel-shadow)"
                />

                {/* 2. Ala Izquierda Exterior (iluminada, blanco puro) */}
                <polygon
                  points="0,-105 -88,72 -20,60"
                  fill="url(#left-wing-grad)"
                  stroke="#e2e8f0"
                  strokeWidth="0.75"
                />

                {/* 3. Pliegue Interior Izquierdo (volumen diedro) */}
                <polygon
                  points="0,-105 -20,60 0,90"
                  fill="#e8ecf2"
                  stroke="#cbd5e1"
                  strokeWidth="0.5"
                />

                {/* 4. Pliegue Interior Derecho (sombra media) */}
                <polygon
                  points="0,-105 0,90 20,60"
                  fill="#cbd5e1"
                  stroke="#94a3b8"
                  strokeWidth="0.5"
                />

                {/* 5. Ala Derecha Exterior (sombra suave de perspectiva) */}
                <polygon
                  points="0,-105 20,60 88,72"
                  fill="url(#right-wing-grad)"
                  stroke="#cbd5e1"
                  strokeWidth="0.75"
                />

                {/* 6. Línea afilada del lomo central */}
                <line
                  x1="0"
                  y1="-105"
                  x2="0"
                  y2="90"
                  stroke="#94a3b8"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FASE 2, 3 & 4: SOBRE ORIGAMI / COMUNICADO DESPLEGABLE ───── */}
      {isEnvelopeMode && (
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 15 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ perspective: 1200 }}
          className="relative z-20 w-full max-w-xl mx-auto"
        >
          {/* Contenedor con Perspectiva 3D y Borde Institucional */}
          <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)] overflow-hidden transition-colors">
            {/* Barra Superior con Gradiente Institucional */}
            <div className="h-1.5 w-full bg-linear-to-r from-[#7114EF] via-[#1475F7] to-[#08D9FF]" />

            {/* Cabecera del Comunicado */}
            <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950/70 text-[#7114EF] dark:text-purple-300 flex items-center justify-center">
                  <Bell className="w-4 h-4 animate-bounce" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#7114EF] dark:text-[#08D9FF] block">
                    IESP "Huanta" • Aviso Oficial
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    COMUNICADO INSTITUCIONAL
                  </h3>
                </div>
              </div>

              {/* Botón de Cierre "X" */}
              <button
                type="button"
                onClick={startCloseSequence}
                disabled={phase !== "open"}
                aria-label="Cerrar comunicado"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer text-xs font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Contenido Principal del Comunicado */}
            <div className="p-6 space-y-4">
              {/* Título de Impacto */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[#1475F7] dark:text-indigo-300 text-xs font-medium">
                  <Sparkles className="w-3 h-3 text-[#08D9FF]" />
                  <span>Proceso de Admisión & Matrículas 2026</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                  ¡Novedades Importantes para Postulantes!
                </h2>
              </div>

              {/* Imagen / Afiche Oficial */}
              <div className="relative rounded-2xl overflow-hidden aspect-16/9 bg-slate-100 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800">
                <img
                  src={admisionResImg}
                  alt="Resultados y convocatoria de admisión IESP Huanta"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#08D9FF]" />
                  <span>Periodo Lectivo 2026</span>
                </div>
              </div>

              {/* Texto Descriptivo Institucional */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                ¡Encuentra los programas académicos actualizados de nuestros 5
                programas de estudio licenciados! Revisa el padrón de
                ingresantes, requisitos para convalidaciones y la confirmación
                de vacantes de la convocatoria oficial.
              </p>

              {/* Botones de Acción */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={startCloseSequence}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer text-center"
                >
                  Entendido, cerrar
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (onActionClick) {
                      onActionClick()
                    }
                    startCloseSequence()
                  }}
                  className="btn-pill-gradient text-white text-xs font-bold px-5 py-2.5 shadow-md shadow-purple-950/20 hover:shadow-purple-600/30 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Ver Resultados & Convocatoria</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ── SOLAPAS 3D ORIGAMI (Se abren en unfolding y se cierran en folding) ── */}
            {/* Solapa Izquierda */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{
                rotateY: phase === "unfolding" || phase === "open" ? -175 : 0,
              }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              style={{
                transformOrigin: "left center",
                backfaceVisibility: "hidden",
              }}
              className={`absolute top-0 bottom-0 left-0 w-1/2 bg-linear-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 border-r border-slate-300 dark:border-slate-600 z-40 pointer-events-none shadow-xl ${
                phase === "open" ? "hidden" : "block"
              }`}
            >
              <div className="w-full h-full flex items-center justify-center opacity-40">
                <div className="w-12 h-12 border-2 border-dashed border-slate-400 rounded-full" />
              </div>
            </motion.div>

            {/* Solapa Derecha */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{
                rotateY: phase === "unfolding" || phase === "open" ? 175 : 0,
              }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              style={{
                transformOrigin: "right center",
                backfaceVisibility: "hidden",
              }}
              className={`absolute top-0 bottom-0 right-0 w-1/2 bg-linear-to-l from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 border-l border-slate-300 dark:border-slate-600 z-40 pointer-events-none shadow-xl ${
                phase === "open" ? "hidden" : "block"
              }`}
            >
              <div className="w-full h-full flex items-center justify-center opacity-40">
                <div className="w-12 h-12 border-2 border-dashed border-slate-400 rounded-full" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
