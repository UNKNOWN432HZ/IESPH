import { useEffect, useState } from "react"
import { IconCheck, IconPhone } from "@/components/icons/Icons"
import { CAREERS } from "@/data/careers"
import { INSTITUTION_CONTACT } from "@/data/institution"

interface AdmissionModalProps {
  isOpen: boolean
  initialCareer?: string
  onClose: () => void
}

export default function AdmissionModal({
  isOpen,
  initialCareer,
  onClose,
}: AdmissionModalProps) {
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [selectedCareer, setSelectedCareer] = useState(initialCareer || "")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (initialCareer) {
      setSelectedCareer(initialCareer)
    }
  }, [initialCareer])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = "unset"
      setSubmitted(false)
    }
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(
      `¡Hola! Mi nombre es ${fullName}. Deseo solicitar información sobre la Convocatoria de Admisión 2026 para el programa de ${selectedCareer || "educación técnica"}. Mi número de contacto es ${phone}.`,
    )
    window.open(
      `https://wa.me/${INSTITUTION_CONTACT.whatsapp}?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    )
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admission-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Backdrop clickable */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Container con diseño idéntico a la captura */}
      <div className="relative z-10 w-full max-w-115 rounded-3xl bg-[#0b1528] text-white shadow-2xl border border-slate-700/60 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Línea superior con gradiente de marca */}
        <div className="h-0.75 w-full bg-linear-to-r from-[#7114EF] via-[#1475F7] to-[#08D9FF]" />

        {/* Botón Cerrar '×' */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-lg font-bold"
          aria-label="Cerrar formulario"
        >
          ✕
        </button>

        <div className="p-6 sm:p-8">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="mb-6">
                <span className="text-xs font-black tracking-widest uppercase text-[#08D9FF] block mb-1">
                  CONVOCATORIA 2026
                </span>
                <h2
                  id="admission-modal-title"
                  className="text-xl sm:text-2xl font-black text-white tracking-tight"
                >
                  Inscripción e Informes de Admisión
                </h2>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Déjanos tus datos y un asesor de secretaría académica te
                  contactará con los requisitos oficiales.
                </p>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nombres y Apellidos */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-bold text-slate-300 mb-1.5"
                  >
                    Nombres y Apellidos
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej. Juan Pérez Quispe"
                    className="w-full px-4 py-3 rounded-xl bg-[#14233e] border border-slate-700/80 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#1475F7] focus:ring-1 focus:ring-[#1475F7] transition-all"
                  />
                </div>

                {/* Teléfono / WhatsApp */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-bold text-slate-300 mb-1.5"
                  >
                    Teléfono / WhatsApp
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9XX XXX XXX"
                    className="w-full px-4 py-3 rounded-xl bg-[#14233e] border border-slate-700/80 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#1475F7] focus:ring-1 focus:ring-[#1475F7] transition-all"
                  />
                </div>

                {/* Carrera Técnica de Interés */}
                <div>
                  <label
                    htmlFor="careerSelect"
                    className="block text-xs font-bold text-slate-300 mb-1.5"
                  >
                    Carrera Técnica de Interés
                  </label>
                  <div className="relative">
                    <select
                      id="careerSelect"
                      required
                      value={selectedCareer}
                      onChange={(e) => setSelectedCareer(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#14233e] border border-slate-700/80 text-white text-xs sm:text-sm appearance-none focus:outline-none focus:border-[#1475F7] focus:ring-1 focus:ring-[#1475F7] transition-all pr-10 cursor-pointer"
                    >
                      <option
                        value=""
                        disabled
                        className="bg-[#0b1528] text-slate-400"
                      >
                        Selecciona una carrera técnica
                      </option>
                      {CAREERS.map((c) => (
                        <option
                          key={c.id}
                          value={c.name}
                          className="bg-[#0b1528] text-white"
                        >
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Modalidad y Turno */}
                <div>
                  <span className="block text-xs font-bold text-slate-300 mb-1.5">
                    Modalidad y Turno
                  </span>
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#14233e] border border-slate-700/80 text-xs text-slate-300">
                    <span className="font-semibold text-slate-300">
                      Presencial - Sede Huanta
                    </span>
                    <span className="font-bold text-white">
                      7:30 am – 1:15 pm
                    </span>
                  </div>
                </div>

                {/* Botón de Envío */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-linear-to-r from-[#7114EF] to-[#1475F7] hover:opacity-95 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-purple-900/30 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Solicitar Información de Admisión
                  </button>
                </div>
              </form>

              {/* Pie informativo */}
              <p className="text-[11px] text-center text-slate-400 mt-5 leading-normal">
                Atención presencial en Secretaría Académica: Jr. Córdova N° 650,
                Huanta.
              </p>
            </>
          ) : (
            /* Estado de Confirmación */
            <div className="text-center py-6 space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/40">
                <IconCheck className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-black text-white">
                  ¡Solicitud Registrada con Éxito!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-sm mx-auto leading-relaxed">
                  Gracias por tu interés en el IESPH,{" "}
                  <strong className="text-white">{fullName}</strong>. Un asesor
                  de Secretaría Académica revisará tus datos para el programa de{" "}
                  <strong className="text-[#08D9FF]">{selectedCareer}</strong>.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppRedirect}
                  className="w-full py-3 px-5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <IconPhone className="w-4 h-4" />
                  <span>Contactar Asesor por WhatsApp Inmediato</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
