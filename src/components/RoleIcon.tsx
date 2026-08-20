import {
  BookOpen,
  HeartPulse,
  Landmark,
  Sparkles,
  Store,
  Users,
} from 'lucide-react'
import type { RoleId } from '../types'

const iconMap = {
  general: Sparkles,
  care: HeartPulse,
  education: BookOpen,
  business: Store,
  policy: Landmark,
  community: Users,
}

export function RoleIcon({ role, size = 20 }: { role: RoleId; size?: number }) {
  const Icon = iconMap[role]
  return <Icon size={size} aria-hidden="true" />
}
