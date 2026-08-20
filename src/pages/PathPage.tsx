import { ArrowRight, Check, Circle, Clock3, Route } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLearner } from '../context/LearnerContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { competencyLabels, getRecommendedModules, rolePathTitle } from '../lib/engine'

export function PathPage() {
  const { state } = useLearner()
  useDocumentTitle('My path')
  const path = getRecommendedModules(state)

  return (
    <div className="page path-page">
      <section className="page-hero page-hero--path">
        <div>
          <div className="eyebrow"><Route size={16} /> YOUR ADAPTIVE CORE</div>
          <h1>{rolePathTitle(state.role)}</h1>
          <p>Six durable capabilities. Your check-in and practice results move the most useful unfinished lab to the top.</p>
        </div>
        <div className="path-legend">
          <span><i className="legend-dot legend-dot--current" /> Recommended</span>
          <span><i className="legend-dot legend-dot--complete" /> Complete</span>
          <span><i className="legend-dot" /> Not started</span>
        </div>
      </section>

      {!state.diagnosticCompleted && (
        <div className="path-callout">
          <div><strong>Make the order yours.</strong><span>Six decisions help route the weakest skill first.</span></div>
          <Link className="button button--paper" to="/check-in">Take the check-in <ArrowRight size={16} /></Link>
        </div>
      )}

      <section className="path-list-section">
        <div className="path-list-heading">
          <span>{state.diagnosticCompleted ? 'RECOMMENDED ORDER' : 'FOUNDATION ORDER'}</span>
          <span>{path.reduce((sum, module) => sum + module.minutes, 0)} minutes total</span>
        </div>
        <ol className="path-list">
          {path.map((module, index) => {
            const status = state.modules[module.id] ?? 'not-started'
            const isCurrent = index === 0 && status !== 'complete'
            return (
              <li className={`path-item path-item--${status} ${isCurrent ? 'path-item--current' : ''}`} key={module.id}>
                <div className="path-item__rail" aria-hidden="true">
                  <span>{status === 'complete' ? <Check size={18} /> : <Circle size={13} fill="currentColor" />}</span>
                </div>
                <div className="path-item__number">{module.number}</div>
                <div className="path-item__copy">
                  <div className="path-item__meta">
                    <span>{competencyLabels[module.competency]}</span>
                    <span><Clock3 size={14} /> {module.minutes} min</span>
                    {isCurrent && <span className="recommended-chip">Recommended next</span>}
                  </div>
                  <h2>{module.title}</h2>
                  <p>{module.summary}</p>
                  <blockquote>{module.mentalModel}</blockquote>
                </div>
                <Link className={`button ${isCurrent ? 'button--coral' : 'button--ghost'}`} to={`/lesson/${module.id}`}>
                  {status === 'complete' ? 'Review' : status === 'in-progress' ? 'Continue' : 'Start'}
                  <ArrowRight size={16} />
                </Link>
              </li>
            )
          })}
        </ol>
      </section>

      <section className="path-footer-card">
        <div><span className="eyebrow">WHY THE ORDER CAN CHANGE</span><h2>Adaptation should be visible.</h2></div>
        <p>This path uses only your answer scores and completion state. It does not infer personality, ability, or protected traits. You can open any lab at any time.</p>
      </section>
    </div>
  )
}
