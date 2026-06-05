import {
  Dumbbell, HeartPulse, Users, Salad, Baby, Coffee, Activity, Zap, Star,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  Dumbbell, HeartPulse, Users, Salad, Baby, Coffee, Activity, Zap, Star,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = MAP[name] ?? Activity;
  return <Cmp className={className} />;
}

export const ICON_NAMES = Object.keys(MAP);
