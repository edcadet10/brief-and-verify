import { ArrowRight, CheckCircle2, FlaskConical, LockKeyhole, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { RoleIcon } from '../components/RoleIcon'
import { useLearner } from '../context/LearnerContext'
import { getRole, roles } from '../data/roles'
import { getScenarioForRole, scenarios } from '../data/scenarios'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function PracticePage() {
  const { state } = useLearner()
  useDocumentTitle('Practice lab')
  const currentRole = getRole(state.role)
  const featured = getScenarioForRole(state.role)
  const completedScenarioIds = new Set(state.scenarioAttempts.map((attempt) => attempt.scenarioId))

  return (
    <div className="page practice-page">
      <section className="page-hero page-hero--practice">
        <div>
          <div className="eyebrow"><FlaskConical size={16} /> PRACTICE LAB</div>
          <h1>Make the call before you see the lesson.</h1>
          <p>Each practice case gives you three choices: explain the job, check the result, and make the final call.</p>
        </div>
        <div className="engine-note">
          <LockKeyhole size={19} />
          <div><strong>Written practice feedback</strong><span>Nothing you enter leaves your browser. The same choice always gets the same feedback.</span></div>
        </div>
      </section>

      <section className="featured-scenario" style={{ '--role-color': currentRole.color } as React.CSSProperties}>
        <div className="featured-scenario__visual">
          <span className="featured-scenario__role"><RoleIcon role={state.role} /> {currentRole.label}</span>
          <div className="scenario-stack" aria-hidden="true">
            <div><span>01</span> Brief</div>
            <div><span>02</span> Verify</div>
            <div><span>03</span> Decide</div>
          </div>
        </div>
        <div className="featured-scenario__copy">
          <div className="scenario-meta"><span>{featured.difficulty}</span><span>{featured.minutes} min</span></div>
          <h2>{featured.title}</h2>
          <p>{featured.summary}</p>
          <dl><dt>Setting</dt><dd>{featured.setting}</dd><dt>What is at stake</dt><dd>{featured.stakes}</dd></dl>
          <Link className="button button--coral button--large" to={`/practice/${featured.id}`}>
            {completedScenarioIds.has(featured.id) ? 'Practice again' : 'Enter scenario'}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="scenario-library">
        <div className="panel-heading">
          <div><span className="eyebrow">CHANGE THE CONTEXT</span><h2>Same skill. Different stakes.</h2></div>
          <p>Explore any lens—your selected path stays unchanged.</p>
        </div>
        <div className="scenario-card-grid">
          {scenarios.filter((scenario) => scenario.id !== featured.id).map((scenario) => {
            const role = roles.find((item) => item.id === scenario.role) ?? roles[0]
            const completed = completedScenarioIds.has(scenario.id)
            const attempts = state.scenarioAttempts.filter((attempt) => attempt.scenarioId === scenario.id)
            const bestScore = attempts.length ? Math.max(...attempts.map((attempt) => attempt.score)) : null
            return (
              <article className="scenario-card" key={scenario.id} style={{ '--role-color': role.color } as React.CSSProperties}>
                <div className="scenario-card__top">
                  <span className="scenario-card__icon"><RoleIcon role={role.id} /></span>
                  {completed ? <span className="complete-chip"><CheckCircle2 size={14} /> Best {bestScore}%</span> : <span>{scenario.difficulty}</span>}
                </div>
                <span className="scenario-card__role">{role.label}</span>
                <h3>{scenario.title}</h3>
                <p>{scenario.summary}</p>
                <div className="scenario-card__footer"><span>{scenario.minutes} min</span><Link to={`/practice/${scenario.id}`}>{completed ? <><RotateCcw size={15} /> Again</> : <>Start <ArrowRight size={15} /></>}</Link></div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="practice-principles">
        <div><strong>No automatic grading</strong><span>Each choice uses a score and explanation written in advance.</span></div>
        <div><strong>Feedback before points</strong><span>Every option explains why it helps or where it falls short.</span></div>
        <div><strong>Retry without penalty</strong><span>Practice is a place to learn and try again.</span></div>
      </section>
    </div>
  )
}
