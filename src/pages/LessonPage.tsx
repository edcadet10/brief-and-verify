import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Check,
  CheckCircle2,
  Clock3,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useLearner } from '../context/LearnerContext'
import { getModule, modules } from '../data/modules'
import { getRole } from '../data/roles'
import { getSource } from '../data/sources'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { competencyLabels } from '../lib/engine'

export function LessonPage() {
  const { moduleId = '' } = useParams()
  const module = getModule(moduleId)
  const { state, startModule, finishModule } = useLearner()
  const navigate = useNavigate()
  useDocumentTitle(module?.title ?? 'Lesson')
  const [selected, setSelected] = useState('')
  const [checked, setChecked] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [completedScore, setCompletedScore] = useState<number | null>(null)

  useEffect(() => {
    if (module) startModule(module.id)
  }, [module, startModule])

  const selectedOption = module?.challenge.options.find((option) => option.id === selected)
  const role = getRole(state.role)
  const roleExample = module?.roleExamples[state.role] ?? module?.roleExamples.general
  const moduleIndex = modules.findIndex((item) => item.id === moduleId)
  const nextModule = modules[moduleIndex + 1]
  const sources = useMemo(
    () => module?.sourceIds.map(getSource).filter(Boolean) ?? [],
    [module],
  )

  if (!module || !roleExample) return <Navigate to="/path" replace />

  const checkAnswer = () => {
    if (!selectedOption) return
    setChecked(true)
  }

  const tryAgain = () => {
    setAttempts((count) => count + 1)
    setSelected('')
    setChecked(false)
  }

  const completeLesson = (repaired = false) => {
    if (!selectedOption) return
    const score = repaired
      ? Math.max(55, selectedOption.score * 35)
      : attempts > 0
        ? 82
        : selectedOption.score === 2
          ? 100
          : 65
    finishModule(module.id, score)
    setCompletedScore(score)
  }

  return (
    <div className="lesson-page">
      <div className="lesson-breadcrumb page-narrow">
        <Link to="/path"><ArrowLeft size={16} /> My path</Link>
        <span>Lab {module.number} of 06</span>
      </div>

      <header className="lesson-hero">
        <div className="page-narrow lesson-hero__inner">
          <div className="lesson-hero__meta">
            <span>{competencyLabels[module.competency]}</span>
            <span><Clock3 size={15} /> {module.minutes} minutes</span>
            <span>{role.shortLabel} lens</span>
          </div>
          <h1>{module.title}</h1>
          <p>{module.outcome}</p>
          <div className="lesson-model"><span>MENTAL MODEL</span>“{module.mentalModel}”</div>
        </div>
      </header>

      <article className="page-narrow lesson-content">
        <section className="lesson-section lesson-explainer">
          <div className="lesson-section__number">01</div>
          <div>
            <div className="eyebrow">GET THE IDEA</div>
            <h2>{module.eyebrow}</h2>
            {module.explanation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section className="role-example-card" style={{ '--role-color': role.color } as React.CSSProperties}>
          <div className="role-example-card__header">
            <span>IN YOUR WORLD · {role.label.toUpperCase()}</span>
            <span>{roleExample.situation}</span>
          </div>
          <div className="brief-comparison">
            <div className="brief-comparison__weak">
              <span>TOO LOOSE</span>
              <p>“{roleExample.weakBrief}”</p>
            </div>
            <ArrowRight className="brief-comparison__arrow" aria-hidden="true" />
            <div className="brief-comparison__strong">
              <span>BETTER BOUNDARY</span>
              <p>“{roleExample.strongerBrief}”</p>
            </div>
          </div>
          <div className="watch-note"><ShieldCheck size={18} /><span><strong>Watch for:</strong> {roleExample.watchFor}</span></div>
        </section>

        <section className="lesson-section">
          <div className="lesson-section__number">02</div>
          <div className="lesson-section__full">
            <div className="eyebrow">MAKE IT USABLE</div>
            <h2>A three-move practice</h2>
            <div className="step-grid">
              {module.steps.map((step, index) => (
                <article key={step.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lesson-section challenge-section">
          <div className="lesson-section__number">03</div>
          <div className="lesson-section__full">
            <div className="eyebrow">RETRIEVE, DON’T JUST RECOGNIZE</div>
            <h2>Make the call</h2>
            <p className="challenge-prompt">{module.challenge.prompt}</p>

            {completedScore === null ? (
              <>
                <fieldset className="challenge-options">
                  <legend className="sr-only">Choose an answer</legend>
                  {module.challenge.options.map((option, index) => (
                    <label
                      className={`challenge-option ${selected === option.id ? 'challenge-option--selected' : ''} ${checked && selected === option.id ? `challenge-option--score-${option.score}` : ''}`}
                      key={option.id}
                    >
                      <input
                        type="radio"
                        name="lesson-challenge"
                        disabled={checked}
                        checked={selected === option.id}
                        onChange={() => setSelected(option.id)}
                      />
                      <span>{String.fromCharCode(65 + index)}</span>
                      <p>{option.label}</p>
                      {checked && selected === option.id && (option.score === 2 ? <CheckCircle2 /> : <RotateCcw />)}
                    </label>
                  ))}
                </fieldset>

                {checked && selectedOption && (
                  <div className={`answer-feedback answer-feedback--${selectedOption.score === 2 ? 'correct' : 'repair'}`} role="status">
                    <div>{selectedOption.score === 2 ? <CheckCircle2 /> : <RotateCcw />}</div>
                    <div>
                      <strong>{selectedOption.score === 2 ? 'That holds up.' : 'Pause and repair.'}</strong>
                      <p>{selectedOption.rationale}</p>
                    </div>
                  </div>
                )}

                <div className="challenge-actions">
                  {!checked && (
                    <button className="button button--ink" type="button" disabled={!selected} onClick={checkAnswer}>
                      Check my reasoning <BookOpenCheck size={17} />
                    </button>
                  )}
                  {checked && selectedOption?.score === 2 && (
                    <button className="button button--coral" type="button" onClick={() => completeLesson()}>
                      Complete lab <Check size={17} />
                    </button>
                  )}
                  {checked && selectedOption && selectedOption.score < 2 && attempts < 1 && (
                    <button className="button button--paper" type="button" onClick={tryAgain}>
                      Try a tighter answer <RotateCcw size={17} />
                    </button>
                  )}
                  {checked && selectedOption && selectedOption.score < 2 && attempts >= 1 && (
                    <button className="button button--paper" type="button" onClick={() => completeLesson(true)}>
                      Save the repair and continue <ArrowRight size={17} />
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="lesson-complete-card" role="status">
                <div className="lesson-complete-card__check"><Check size={28} /></div>
                <div>
                  <span>LAB COMPLETE · {completedScore}% PRACTICE SCORE</span>
                  <h3>You turned the idea into a decision.</h3>
                  <p>Your path now uses this result when choosing what to surface next.</p>
                </div>
                <button className="button button--ink" type="button" onClick={() => navigate(nextModule ? `/lesson/${nextModule.id}` : '/practice')}>
                  {nextModule ? 'Next lab' : 'Practice in context'} <ArrowRight size={17} />
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="lesson-sources">
          <span>RESEARCH TRACE</span>
          <p>This lesson is original curriculum informed by:</p>
          <ul>
            {sources.map((source) => source && (
              <li key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.organization}, {source.title} ({source.year})</a></li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  )
}
