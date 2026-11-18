import {
  Menu as LucideMenu,
  Moon as LucideMoon,
  Sun as LucideSun,
  X as LucideX,
} from "lucide"
import {
  Activity,
  Apple,
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Calendar,
  Car,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Code2,
  Cpu,
  ExternalLink,
  FileCheck,
  FileText,
  FlaskConical,
  Gauge,
  Globe,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Monitor,
  Moon,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Sprout,
  Stethoscope,
  Sun,
  User,
  Users,
  Wheat,
  Wrench,
  Zap,
} from "lucide-react"
import { MorphIcon } from "morphicons/react"

// ── Morphing Interactive Icons ────────────────────────────
export function MorphThemeToggle({
  isDark,
  className = "w-5 h-5",
}: {
  isDark: boolean
  className?: string
}) {
  return (
    <MorphIcon
      icon={isDark ? LucideSun : LucideMoon}
      className={className}
      spring="snappy"
    />
  )
}

export function MorphMenuToggle({
  isOpen,
  className = "w-6 h-6",
}: {
  isOpen: boolean
  className?: string
}) {
  return (
    <MorphIcon
      icon={isOpen ? LucideX : LucideMenu}
      className={className}
      spring="snappy"
    />
  )
}

// ── Standard Institutional Icons (Tree-shaken & Clean) ────
export function IconPhone({ className = "w-4 h-4" }: { className?: string }) {
  return <Phone className={className} />
}

export function IconMapPin({ className = "w-4 h-4" }: { className?: string }) {
  return <MapPin className={className} />
}

export function IconClock({ className = "w-4 h-4" }: { className?: string }) {
  return <Clock className={className} />
}

export function IconMail({ className = "w-4 h-4" }: { className?: string }) {
  return <Mail className={className} />
}

export function IconLocationMap({
  className = "w-4 h-4",
}: {
  className?: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" x2="9" y1="3" y2="18" />
      <line x1="15" x2="15" y1="6" y2="21" />
      <circle cx="15" cy="11" r="2.5" fill="#7114EF" stroke="none" />
    </svg>
  )
}

export function IconFacebook({
  className = "w-4 h-4",
}: {
  className?: string
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.52-.14-2.83-.14-2.8 0-4.67 1.71-4.67 4.8v2.7H7v4h3V22h4v-8.5z" />
    </svg>
  )
}

export function IconCheck({ className = "w-4 h-4" }: { className?: string }) {
  return <Check className={className} />
}

export function IconAcademicCap({
  className = "w-5 h-5",
}: {
  className?: string
}) {
  return <GraduationCap className={className} />
}

export function IconBuilding({
  className = "w-5 h-5",
}: {
  className?: string
}) {
  return <Building2 className={className} />
}

export function IconBriefcase({
  className = "w-5 h-5",
}: {
  className?: string
}) {
  return <Briefcase className={className} />
}

export function IconFlask({ className = "w-5 h-5" }: { className?: string }) {
  return <FlaskConical className={className} />
}

export function IconDocument({
  className = "w-5 h-5",
}: {
  className?: string
}) {
  return <FileText className={className} />
}

export function IconBook({ className = "w-5 h-5" }: { className?: string }) {
  return <BookOpen className={className} />
}

export function IconComputer({
  className = "w-5 h-5",
}: {
  className?: string
}) {
  return <Monitor className={className} />
}

export function IconHeartPulse({
  className = "w-5 h-5",
}: {
  className?: string
}) {
  return <Activity className={className} />
}

export function IconWrench({ className = "w-5 h-5" }: { className?: string }) {
  return <Wrench className={className} />
}

export function IconLeaf({ className = "w-5 h-5" }: { className?: string }) {
  return <Sprout className={className} />
}

export function IconBeaker({ className = "w-5 h-5" }: { className?: string }) {
  return <FlaskConical className={className} />
}

export function IconSun({ className = "w-4 h-4" }: { className?: string }) {
  return <Sun className={className} />
}

export function IconMoon({ className = "w-4 h-4" }: { className?: string }) {
  return <Moon className={className} />
}

export function IconSpinner({ className = "w-4 h-4" }: { className?: string }) {
  return <Loader2 className={`animate-spin ${className}`} />
}

export function IconExternalLink({
  className = "w-4 h-4",
}: {
  className?: string
}) {
  return <ExternalLink className={className} />
}

export function IconSparkles({
  className = "w-4 h-4",
}: {
  className?: string
}) {
  return <Sparkles className={className} />
}

export function IconShieldCheck({
  className = "w-4 h-4",
}: {
  className?: string
}) {
  return <ShieldCheck className={className} />
}

export function IconChevronDown({
  className = "w-4 h-4",
}: {
  className?: string
}) {
  return <ChevronDown className={className} />
}

export function IconChevronUp({
  className = "w-4 h-4",
}: {
  className?: string
}) {
  return <ChevronUp className={className} />
}

export function IconCode({ className = "w-5 h-5" }: { className?: string }) {
  return <Code2 className={className} />
}

export function IconUsers({ className = "w-4 h-4" }: { className?: string }) {
  return <Users className={className} />
}

export function IconAward({ className = "w-4 h-4" }: { className?: string }) {
  return <Award className={className} />
}

export function IconCalendar({
  className = "w-4 h-4",
}: {
  className?: string
}) {
  return <Calendar className={className} />
}

export function IconFileCheck({
  className = "w-4 h-4",
}: {
  className?: string
}) {
  return <FileCheck className={className} />
}

export function IconSearch({ className = "w-4 h-4" }: { className?: string }) {
  return <Search className={className} />
}

export function IconArrowLeft({
  className = "w-4 h-4",
}: {
  className?: string
}) {
  return <ArrowLeft className={className} />
}

export function IconArrowRight({
  className = "w-4 h-4",
}: {
  className?: string
}) {
  return <ArrowRight className={className} />
}

export function IconUser({ className = "w-4 h-4" }: { className?: string }) {
  return <User className={className} />
}

export function IconStethoscope({
  className = "w-4 h-4",
}: {
  className?: string
}) {
  return <Stethoscope className={className} />
}

export function IconGlobe({ className = "w-4 h-4" }: { className?: string }) {
  return <Globe className={className} />
}

export function IconCpu({ className = "w-4 h-4" }: { className?: string }) {
  return <Cpu className={className} />
}

export function IconCar({ className = "w-4 h-4" }: { className?: string }) {
  return <Car className={className} />
}

export function IconApple({ className = "w-4 h-4" }: { className?: string }) {
  return <Apple className={className} />
}

export function IconWheat({ className = "w-4 h-4" }: { className?: string }) {
  return <Wheat className={className} />
}

export function IconGauge({ className = "w-4 h-4" }: { className?: string }) {
  return <Gauge className={className} />
}

export function IconZap({ className = "w-4 h-4" }: { className?: string }) {
  return <Zap className={className} />
}

// Brand SVG for WhatsApp (Lucide doesn't include commercial third-party brand logos)
export function IconWhatsApp({
  className = "w-4 h-4",
}: {
  className?: string
}) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.74-.66-1.25-1.48-1.4-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z" />
    </svg>
  )
}
