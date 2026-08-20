import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link className={`brand ${light ? 'brand--light' : ''}`} to="/" aria-label="Brief and Verify home">
      <span className="brand__mark" aria-hidden="true">
        <span>B</span>
        <Check size={14} strokeWidth={3} />
      </span>
      <span className="brand__name">Brief &amp; Verify</span>
    </Link>
  )
}
