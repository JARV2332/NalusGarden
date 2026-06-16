import {
  Baby,
  Briefcase,
  Camera,
  Car,
  Coffee,
  Crown,
  Disc3,
  Flower2,
  GraduationCap,
  Heart,
  HeartHandshake,
  Lamp,
  LayoutGrid,
  MapPin,
  Mic2,
  MonitorPlay,
  Music2,
  PartyPopper,
  ParkingCircle,
  Shield,
  Sparkles,
  Trees,
  UtensilsCrossed,
  Video,
  Wine,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  garden: Trees,
  fabric: Lamp,
  dance: Music2,
  ceremony: Flower2,
  lake: MapPin,
  parking: ParkingCircle,
  room: LayoutGrid,
  camera: Camera,
  car: Car,
  setup: Shield,
  furniture: LayoutGrid,
  audio: Disc3,
  projector: MonitorPlay,
  sign: Sparkles,
  banquet: UtensilsCrossed,
  toast: Wine,
  cake: PartyPopper,
  coffee: Coffee,
  staff: HeartHandshake,
  mc: Mic2,
  memorial: Heart,
  tasting: UtensilsCrossed,
  rings: Heart,
  crown: Crown,
  baby: Baby,
  balloon: PartyPopper,
  briefcase: Briefcase,
  graduation: GraduationCap,
  heart: Heart,
  sparkles: Sparkles,
  video: Video,
};

export function ServiceIcon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Sparkles;
  return <Icon className={className} aria-hidden="true" />;
}
