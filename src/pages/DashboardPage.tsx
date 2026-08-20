import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FlaskConical,
  Gauge,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProgressBar } from '../components/ProgressBar'
import { RoleIcon } from '../components/RoleIcon'
import { useLearner } from '../context/LearnerContext'
import { getRole } from '../data/roles'
import { getScenarioForRole } from '../data/scenarios'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import {
  calculateCompletion,
  calculateMasteryAverage,
  competencyLabels,
  getRecommendedModules,
  rolePathTitle,
} from '../lib/engine'

export function DashboardPage() {
  const { state } = useLearner()
  useDocumentTitle('Home')
  const role = getRole(state.role)
  const scenario = getScenarioForRole(state.role)
  const recommended = getRecommendedModules(state)
  const focus = recommended.find((module) => state.modules[module.id] !== 'complete') ?? recommended[0]
  const completion = calculateCompletion(state)
  const mastery = calculateMasteryAverage(state)
  const completedModules = Object.values(state.modules).filter((status) => status === 'complete').length
  const focusStatus = state.modules[focus.id]

  return (
    <div className="page dashboard-page">
      {!state.onboarded && (
        <div className="notice-banner">
          <span><Sparkles size={18} /> Build a role-shaped path from six practical decisions.</span>
          <Link to="/check-in">Take the check-in <ArrowRight size={16} /></Link>
        </div>
      )}

      <section className="dashboard-hero">
        <div className="dashboard-hero__copy">
          <div className="eyebrow">{rolePathTitle(state.role).toUpperCase()}</div>
          <h1>Practice the part no shortcut can do for you.</h1>
          <p>Your next activity focuses on <strong>{competencyLabels[focus.competency].toLowerCase()}</strong>, the skill that needs the most practice right now.</p>
          <div className="dashboard-hero__actions">
            <Link className="button button--coral button--large" to={`/lesson/${focus.id}`}>
              {focusStatus === 'in-progress' ? 'Continue' : 'Start'} {focus.title}
              <ArrowRight size={18} />
            </Link>
            <span><Clock3 size={16} /> {focus.minutes} minutes</span>
          </div>
        </div>
        <div className="focus-card">
          <div className="focus-card__top">
            <span>NEXT IN YOUR PATH</span>
            <span>{focus.number} / 06</span>
          </div>
          <div className="focus-card__icon"><BookOpen /></div>
          <h2>{focus.title}</h2>
          <p>{focus.summary}</p>
          <div className="focus-card__model">“{focus.mentalModel}”</div>
          <div className="focus-card__progress"><span style={{ width: focusStatus === 'in-progress' ? '42%' : '8%' }} /></div>
        </div>
      </section>

      <section className="metric-row" aria-label="Your learning snapshot">
        <article>
          <div className="metric-row__icon metric-row__icon--lime"><CheckCircle2 /></div>
          <div><strong>{completedModules}<small>/6</small></strong><span>Core labs complete</span></div>
        </article>
        <article>
          <div className="metric-row__icon metric-row__icon--blue"><Gauge /></div>
          <div><strong>{mastery}<small>/100</small></strong><span>Current understanding</span></div>
        </article>
        <article>
          <div className="metric-row__icon metric-row__icon--coral"><FlaskConical /></div>
          <div><strong>{state.scenarioAttempts.length}</strong><span>Scenario practices</span></div>
        </article>
        <article>
          <div className="metric-row__icon metric-row__icon--violet"><RotateCcw /></div>
          <div><strong>{state.fieldExperiment?.reflection ? '1' : '0'}</strong><span>Workplace tests reviewed</span></div>
        </article>
      </section>

      <section className="dashboard-grid">
        <div className="skill-panel panel">
          <div className="panel-heading">
            <div><span className="eyebrow">YOUR SKILL MAP</span><h2>What your practice shows today</h2></div>
            <Link className="text-link" to="/impact">See progress <ArrowRight size={15} /></Link>
          </div>
          <div className="skill-panel__bars">
            {(Object.entries(state.mastery) as Array<[keyof typeof state.mastery, number]>).map(([skill, score], index) => (
              <ProgressBar key={skill} label={competencyLabels[skill]} value={score} tone={index === 2 ? 'coral' : index === 3 ? 'violet' : 'green'} />
            ))}
          </div>
          <p className="fine-print">Scores combine your starting check with completed practice. They show progress here; they do not certify you.</p>
        </div>

        <div className="role-panel panel" style={{ '--role-color': role.color } as React.CSSProperties}>
          <div className="role-panel__badge"><RoleIcon role={role.id} /><span>{role.label}</span></div>
          <div className="eyebrow">PRACTICE IN CONTEXT</div>
          <h2>{scenario.title}</h2>
          <p>{scenario.summary}</p>
          <dl>
            <div><dt>Setting</dt><dd>{scenario.setting}</dd></div>
            <div><dt>Stakes</dt><dd>{scenario.stakes}</dd></div>
          </dl>
          <Link className="button button--ink" to={`/practice/${scenario.id}`}>
            Enter scenario <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="next-up-section">
        <div className="panel-heading">
          <div><span className="eyebrow">KEEP GOING</span><h2>Next up in your path</h2></div>
          <Link className="text-link" to="/path">View full path <ArrowRight size={15} /></Link>
        </div>
        <div className="module-card-grid">
          {recommended.filter((module) => module.id !== focus.id).slice(0, 3).map((module) => (
            <Link className="module-mini-card" key={module.id} to={`/lesson/${module.id}`}>
              <div><span>{module.number}</span><span>{module.minutes} min</span></div>
              <h3>{module.title}</h3>
              <p>{module.summary}</p>
              <span className="module-mini-card__link">{state.modules[module.id] === 'complete' ? 'Review lab' : 'Open lab'} <ArrowRight size={15} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="completion-strip">
        <div><span className="eyebrow">CORE PATH</span><h2>{completion}% complete</h2></div>
        <div className="completion-strip__bar"><span style={{ width: `${completion}%` }} /></div>
        <Link to="/path">View the map <ArrowRight size={17} /></Link>
      </section>
    </div>
  )
}
