export function ProgressBar({
  value,
  label,
  showValue = true,
  tone = 'green',
}: {
  value: number
  label: string
  showValue?: boolean
  tone?: 'green' | 'coral' | 'violet' | 'lime'
}) {
  const boundedValue = Math.min(100, Math.max(0, value))
  return (
    <div className="progress-bar" data-tone={tone}>
      <div className="progress-bar__meta">
        <span>{label}</span>
        {showValue && <span>{boundedValue}%</span>}
      </div>
      <div
        className="progress-bar__track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={boundedValue}
      >
        <span className="progress-bar__fill" style={{ width: `${boundedValue}%` }} />
      </div>
    </div>
  )
}
