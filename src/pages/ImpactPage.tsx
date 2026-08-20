import {
  ArrowRight,
  BarChart3,
  Check,
  Download,
  FileUp,
  Gauge,
  RotateCcw,
  ShieldCheck,
  Target,
} from 'lucide-react'
import { type ChangeEvent, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProgressBar } from '../components/ProgressBar'
import { useLearner } from '../context/LearnerContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import {
  calculateCalibration,
  calculateMasteryAverage,
  calculatePracticeScore,
  competencyLabels,
  scoreDiagnostic,
} from '../lib/engine'
import type { FieldExperiment, LearnerState } from '../types'

const average = (values: number[]) => values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0
const inSevenDays = () => {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return date.toISOString().slice(0, 10)
}

const exportState = (state: LearnerState) => {
  const url = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'brief-and-verify-progress.json'
  anchor.click()
  URL.revokeObjectURL(url)
}

export function ImpactPage() {
  const { state, createFieldExperiment, reflectOnFieldExperiment, importState, reset } = useLearner()
  useDocumentTitle('Your progress')
  const baselineMastery = scoreDiagnostic(state.diagnosticAnswers)
  const baseline = state.diagnosticCompleted ? average(Object.values(baselineMastery)) : 0
  const current = calculateMasteryAverage(state)
  const practice = calculatePracticeScore(state)
  const calibration = calculateCalibration(state.diagnosticAnswers)
  const delta = Math.max(0, current - baseline)
  const [task, setTask] = useState('')
  const [safeguard, setSafeguard] = useState('')
  const [successSignal, setSuccessSignal] = useState('')
  const [reviewOn, setReviewOn] = useState(inSevenDays())
  const [reflection, setReflection] = useState(state.fieldExperiment?.reflection ?? '')
  const [result, setResult] = useState<NonNullable<FieldExperiment['result']>>(state.fieldExperiment?.result ?? 'helped')
  const [importMessage, setImportMessage] = useState('')

  const bestScenario = useMemo(() => state.scenarioAttempts.length ? Math.max(...state.scenarioAttempts.map((attempt) => attempt.score)) : 0, [state.scenarioAttempts])

  const createExperiment = () => {
    if (!task || !safeguard || !successSignal) return
    createFieldExperiment({ task, safeguard, successSignal, reviewOn, createdAt: new Date().toISOString() })
  }

  const importProgress = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const parsed: unknown = JSON.parse(await file.text())
      setImportMessage(importState(parsed) ? 'Progress restored.' : 'That file is not a valid Brief & Verify export.')
    } catch {
      setImportMessage('That file could not be read.')
    }
    event.target.value = ''
  }

  const resetProgress = () => {
    if (window.confirm('Reset all locally saved progress? Export first if you may want it later.')) reset()
  }

  return (
    <div className="page impact-page">
      <section className="page-hero page-hero--impact">
        <div><div className="eyebrow"><BarChart3 size={16} /> YOUR PROGRESS</div><h1>See more than what you completed.</h1><p>See what you understood, the choices you made in practice, and whether one small change helped in real work.</p></div>
        <div className="impact-caveat"><ShieldCheck size={20} /><div><strong>What scores can show</strong><span>A practice score shows what happened here. It does not prove how someone will perform everywhere.</span></div></div>
      </section>

      <section className="impact-summary">
        <article><div className="impact-score impact-score--green"><span>{current}</span><small>/100</small></div><div><span>UNDERSTANDING</span><h2>{state.diagnosticCompleted ? `+${delta} from check-in` : 'Check-in needed'}</h2><p>Starting check plus completed lesson checks</p></div></article>
        <article><div className="impact-score impact-score--coral"><span>{practice}</span><small>/100</small></div><div><span>PRACTICE CHOICES</span><h2>{state.scenarioAttempts.length} scenario {state.scenarioAttempts.length === 1 ? 'attempt' : 'attempts'}</h2><p>Choices in lessons and practice cases</p></div></article>
        <article><div className="impact-score impact-score--violet"><span>{calibration}</span><small>/100</small></div><div><span>CONFIDENCE CHECK</span><h2>{calibration >= 80 ? 'Confidence matched your results' : calibration ? 'Confidence and results differed' : 'Check-in needed'}</h2><p>How closely confidence matched correct answers</p></div></article>
      </section>

      <section className="impact-grid">
        <div className="panel skill-evidence-panel">
          <div className="panel-heading"><div><span className="eyebrow">YOUR SKILLS</span><h2>What your practice shows</h2></div><Gauge /></div>
          <div>{(Object.entries(state.mastery) as Array<[keyof typeof state.mastery, number]>).map(([skill, score], index) => <ProgressBar key={skill} label={competencyLabels[skill]} value={score} tone={index === 2 ? 'coral' : index === 3 ? 'violet' : 'green'} />)}</div>
          {!state.diagnosticCompleted && <Link className="button button--paper" to="/check-in">Take the starting check <ArrowRight size={16} /></Link>}
        </div>
        <div className="panel evidence-ladder-panel">
          <div className="panel-heading"><div><span className="eyebrow">WHAT RESULTS CAN SHOW</span><h2>How far have you tested?</h2></div><Target /></div>
          <ol className="evidence-ladder">
            <li className={state.diagnosticCompleted ? 'done' : ''}><span>{state.diagnosticCompleted ? <Check /> : '1'}</span><div><strong>Understanding</strong><p>Can you identify the stronger action?</p></div><em>{state.diagnosticCompleted ? 'Seen here' : 'Not yet'}</em></li>
            <li className={state.scenarioAttempts.length ? 'done' : ''}><span>{state.scenarioAttempts.length ? <Check /> : '2'}</span><div><strong>Choices in practice</strong><p>Can you use the idea in a messy case?</p></div><em>{state.scenarioAttempts.length ? `Best ${bestScenario}%` : 'Not yet'}</em></li>
            <li className={state.fieldExperiment?.reflection ? 'done' : ''}><span>{state.fieldExperiment?.reflection ? <Check /> : '3'}</span><div><strong>Use in real work</strong><p>Did one small behavior change?</p></div><em>{state.fieldExperiment?.reflection ? 'Reported by you' : 'Not yet'}</em></li>
            <li><span>4</span><div><strong>Change that lasts</strong><p>Does the change continue over time and in different situations?</p></div><em>Needs a real study</em></li>
          </ol>
        </div>
      </section>

      <section className="field-test-section">
        <div className="field-test-section__intro"><div className="eyebrow">SEVEN-DAY FIELD TEST</div><h2>Try one small behavior where it counts.</h2><p>Choose a task that is easy to undo. Set a safety rule and decide what success will look like before you begin.</p></div>
        {!state.fieldExperiment ? (
          <form className="field-test-form" onSubmit={(event) => { event.preventDefault(); createExperiment() }}>
            <label><span>Small, low-risk task</span><textarea required rows={2} value={task} onChange={(event) => setTask(event.target.value)} placeholder="Example: Use the brief canvas for one recurring team update." /></label>
            <label><span>Safety rule you will keep</span><textarea required rows={2} value={safeguard} onChange={(event) => setSafeguard(event.target.value)} placeholder="Example: I will verify every date and owner against the source notes." /></label>
            <label><span>What success will look like</span><textarea required rows={2} value={successSignal} onChange={(event) => setSuccessSignal(event.target.value)} placeholder="Example: Fewer clarification replies without more corrections." /></label>
            <label><span>Review on</span><input required type="date" value={reviewOn} onChange={(event) => setReviewOn(event.target.value)} /></label>
            <button className="button button--coral" type="submit">Start field test <ArrowRight size={17} /></button>
          </form>
        ) : !state.fieldExperiment.reflection ? (
          <div className="field-test-active">
            <div className="field-test-active__date"><span>REVIEW</span><strong>{new Date(`${state.fieldExperiment.reviewOn}T12:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</strong></div>
            <dl><div><dt>Task</dt><dd>{state.fieldExperiment.task}</dd></div><div><dt>Safety rule</dt><dd>{state.fieldExperiment.safeguard}</dd></div><div><dt>What success looks like</dt><dd>{state.fieldExperiment.successSignal}</dd></div></dl>
            <form onSubmit={(event) => { event.preventDefault(); reflectOnFieldExperiment(result, reflection) }}>
              <fieldset><legend>What happened?</legend>{([['helped', 'Helped'], ['mixed', 'Mixed'], ['did-not-help', 'Did not help']] as const).map(([value, label]) => <label className={result === value ? 'selected' : ''} key={value}><input type="radio" name="field-result" checked={result === value} onChange={() => setResult(value)} />{label}</label>)}</fieldset>
              <label><span>What changed, failed, or surprised you?</span><textarea required rows={3} value={reflection} onChange={(event) => setReflection(event.target.value)} /></label>
              <button className="button button--ink" type="submit">Save reflection <Check size={17} /></button>
            </form>
          </div>
        ) : (
          <div className="field-test-complete"><div><Check size={24} /></div><span>WORKPLACE REVIEW SAVED</span><h3>{state.fieldExperiment.result === 'helped' ? 'The behavior helped.' : state.fieldExperiment.result === 'mixed' ? 'The result was mixed.' : 'The test challenged the approach.'}</h3><blockquote>{state.fieldExperiment.reflection}</blockquote><p>Your report is useful, but lasting change needs to be seen more than once over time.</p></div>
        )}
      </section>

      <section className="data-controls" id="data-controls">
        <div><span className="eyebrow">YOUR DATA</span><h2>Saved here, controlled by you.</h2><p>Nothing here is sent to a server. Save a backup if you want to move your progress to another browser.</p>{importMessage && <span className="import-message" role="status">{importMessage}</span>}</div>
        <div><button className="button button--paper" type="button" onClick={() => exportState(state)}><Download size={17} /> Save progress file</button><label className="button button--paper"><FileUp size={17} /> Restore progress<input className="sr-only" type="file" accept="application/json" onChange={importProgress} /></label><button className="button button--danger" type="button" onClick={resetProgress}><RotateCcw size={17} /> Reset</button></div>
      </section>
    </div>
  )
}
