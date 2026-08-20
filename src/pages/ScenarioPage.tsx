import { ArrowLeft, ArrowRight, Check, CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { RoleIcon } from '../components/RoleIcon'
import { useLearner } from '../context/LearnerContext'
import { getRole } from '../data/roles'
import { getScenario } from '../data/scenarios'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { normalizeScenarioScore } from '../lib/engine'
import { practiceProvider } from '../lib/providers/deterministicProvider'
import type { PracticeFeedback, PracticeTurn } from '../lib/providers/contracts'

export function ScenarioPage() {
  const { scenarioId = '' } = useParams()
  const scenario = getScenario(scenarioId)
  const { finishScenario } = useLearner()
  useDocumentTitle(scenario?.title ?? 'Scenario')
  const [turn, setTurn] = useState<PracticeTurn | null>(() => scenario ? practiceProvider.start(scenario) : null)
  const [selected, setSelected] = useState('')
  const [feedback, setFeedback] = useState<PracticeFeedback | null>(null)
  const [choices, setChoices] = useState<string[]>([])
  const [rawScore, setRawScore] = useState(0)
  const [complete, setComplete] = useState(false)

  const role = scenario ? getRole(scenario.role) : null
  if (!scenario || !turn || !role) return <Navigate to="/practice" replace />

  const submitChoice = () => {
    const choice = turn.stage.choices.find((item) => item.id === selected)
    if (!choice) return
    setFeedback(practiceProvider.respond(turn, choice))
  }

  const continueScenario = () => {
    if (!feedback) return
    const nextChoices = [...choices, feedback.choiceId]
    const nextRawScore = rawScore + feedback.score
    const nextTurn = practiceProvider.next(scenario, turn)

    if (!nextTurn) {
      finishScenario(scenario, nextChoices, nextRawScore)
      setChoices(nextChoices)
      setRawScore(nextRawScore)
      setComplete(true)
      return
    }

    setChoices(nextChoices)
    setRawScore(nextRawScore)
    setTurn(nextTurn)
    setSelected('')
    setFeedback(null)
  }

  const resetScenario = () => {
    setTurn(practiceProvider.start(scenario))
    setSelected('')
    setFeedback(null)
    setChoices([])
    setRawScore(0)
    setComplete(false)
  }

  const score = normalizeScenarioScore(rawScore, scenario.stages.length)

  return (
    <div className="scenario-page" style={{ '--role-color': role.color } as React.CSSProperties}>
      <header className="scenario-header">
        <Link to="/practice"><ArrowLeft size={16} /> Practice lab</Link>
        <div className="scenario-header__center"><RoleIcon role={role.id} /><span>{role.label}</span></div>
        <span>{scenario.minutes} min · {scenario.difficulty}</span>
      </header>

      {!complete ? (
        <div className="scenario-stage-page">
          <div className="scenario-stage-progress">
            {scenario.stages.map((stage, index) => (
              <div key={stage.id} className={index < turn.stageIndex ? 'done' : index === turn.stageIndex ? 'current' : ''}>
                <span>{index < turn.stageIndex ? <Check size={14} /> : index + 1}</span>
                <strong>{stage.label}</strong>
              </div>
            ))}
          </div>

          <section className="scenario-stage-card">
            <div className="scenario-stage-card__intro">
              <div className="eyebrow">STAGE {turn.stageIndex + 1} · {turn.stage.label.toUpperCase()}</div>
              <h1>{scenario.title}</h1>
              <p className="scenario-setting">{scenario.setting}</p>
              <div className="scenario-detail">{turn.stage.detail}</div>
              <h2>{turn.stage.prompt}</h2>
              {turn.stage.artifact && (
                <div className="scenario-artifact"><span>WORKING ARTIFACT</span><p>{turn.stage.artifact}</p></div>
              )}
            </div>

            <fieldset className="scenario-options">
              <legend className="sr-only">Choose your response</legend>
              {turn.stage.choices.map((choice, index) => (
                <label className={`scenario-option ${selected === choice.id ? 'scenario-option--selected' : ''}`} key={choice.id}>
                  <input type="radio" name="scenario-choice" disabled={Boolean(feedback)} checked={selected === choice.id} onChange={() => setSelected(choice.id)} />
                  <span className="scenario-option__letter">{String.fromCharCode(65 + index)}</span>
                  <span>{choice.label}</span>
                  {selected === choice.id && <Check size={18} />}
                </label>
              ))}
            </fieldset>

            {feedback && (
              <div className={`scenario-feedback scenario-feedback--${feedback.score}`} role="status">
                <div>{feedback.score === 2 ? <CheckCircle2 /> : <RotateCcw />}</div>
                <div><span>{feedback.score === 2 ? 'Sound judgment' : feedback.score === 1 ? 'Useful, but incomplete' : 'Risk spotted'}</span><p>{feedback.feedback}</p><strong>{feedback.principle}</strong></div>
              </div>
            )}

            <div className="scenario-stage-card__footer">
              <span><ShieldCheck size={16} /> Deterministic branch · no data sent</span>
              {!feedback ? (
                <button className="button button--ink" type="button" disabled={!selected} onClick={submitChoice}>See the consequence <ArrowRight size={17} /></button>
              ) : (
                <button className="button button--coral" type="button" onClick={continueScenario}>{turn.stageIndex === turn.totalStages - 1 ? 'See debrief' : 'Continue'} <ArrowRight size={17} /></button>
              )}
            </div>
          </section>
        </div>
      ) : (
        <div className="scenario-results-page">
          <section className="scenario-result-card">
            <div className="scenario-result-card__score"><span>{score}</span><small>/100</small></div>
            <div className="eyebrow">SCENARIO DEBRIEF</div>
            <h1>{score >= 80 ? 'Your decisions held up.' : score >= 55 ? 'You found the boundary.' : 'The repair is the lesson.'}</h1>
            <p>{scenario.stakes}</p>
            <div className="scenario-result-breakdown">
              {scenario.stages.map((stage, index) => {
                const choice = stage.choices.find((item) => item.id === choices[index])
                return <div key={stage.id}><span>{stage.label}</span><strong>{choice?.principle ?? 'Not answered'}</strong><em>{choice?.score === 2 ? 'Strong' : choice?.score === 1 ? 'Partial' : 'Repair'}</em></div>
              })}
            </div>
            <div className="scenario-result-actions">
              <button className="button button--paper" type="button" onClick={resetScenario}><RotateCcw size={17} /> Practice again</button>
              <Link className="button button--ink" to="/impact">See learning impact <ArrowRight size={17} /></Link>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
