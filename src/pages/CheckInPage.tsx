import { ArrowLeft, ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Brand } from '../components/Brand'
import { ProgressBar } from '../components/ProgressBar'
import { RoleIcon } from '../components/RoleIcon'
import { useLearner } from '../context/LearnerContext'
import { diagnosticQuestions } from '../data/diagnostic'
import { roles } from '../data/roles'
import { competencyLabels, scoreDiagnostic } from '../lib/engine'
import type { DiagnosticAnswer, ExperienceLevel, RoleId } from '../types'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

type Phase = 'profile' | 'questions' | 'results'

const experienceOptions: Array<{ id: ExperienceLevel; label: string; description: string }> = [
  { id: 'new', label: 'New to it', description: 'I have tried little or no generative AI.' },
  { id: 'occasional', label: 'Occasional', description: 'I use it for a few tasks, but not routinely.' },
  { id: 'regular', label: 'Regular', description: 'I use it most weeks and have repeatable workflows.' },
]

export function CheckInPage() {
  const { state, setProfile, finishDiagnostic } = useLearner()
  const navigate = useNavigate()
  useDocumentTitle('Skill check-in')
  const [phase, setPhase] = useState<Phase>(state.diagnosticCompleted ? 'results' : 'profile')
  const [role, setRole] = useState<RoleId>(state.role)
  const [experience, setExperience] = useState<ExperienceLevel>(state.experience)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<DiagnosticAnswer[]>(state.diagnosticAnswers)
  const [selectedOption, setSelectedOption] = useState('')
  const [confidence, setConfidence] = useState<1 | 2 | 3 | null>(null)

  const scores = useMemo(
    () => scoreDiagnostic(phase === 'results' ? state.diagnosticAnswers : answers),
    [answers, phase, state.diagnosticAnswers],
  )
  const sortedSkills = useMemo(
    () => (Object.entries(scores) as Array<[keyof typeof scores, number]>).sort((a, b) => b[1] - a[1]),
    [scores],
  )

  const startQuestions = () => {
    setProfile(role, experience)
    setAnswers([])
    setQuestionIndex(0)
    setSelectedOption('')
    setConfidence(null)
    setPhase('questions')
  }

  const submitAnswer = () => {
    const question = diagnosticQuestions[questionIndex]
    const option = question.options.find((item) => item.id === selectedOption)
    if (!option || !confidence) return

    const nextAnswers = [
      ...answers.filter((item) => item.questionId !== question.id),
      { questionId: question.id, optionId: option.id, score: option.score, confidence },
    ]
    setAnswers(nextAnswers)

    if (questionIndex === diagnosticQuestions.length - 1) {
      finishDiagnostic(nextAnswers)
      setPhase('results')
      return
    }

    setQuestionIndex((index) => index + 1)
    setSelectedOption('')
    setConfidence(null)
  }

  const goBackQuestion = () => {
    if (questionIndex === 0) {
      setPhase('profile')
      return
    }
    const previousIndex = questionIndex - 1
    const previousQuestion = diagnosticQuestions[previousIndex]
    const previousAnswer = answers.find((item) => item.questionId === previousQuestion.id)
    setQuestionIndex(previousIndex)
    setSelectedOption(previousAnswer?.optionId ?? '')
    setConfidence(previousAnswer?.confidence ?? null)
  }

  const retake = () => {
    setAnswers([])
    setQuestionIndex(0)
    setSelectedOption('')
    setConfidence(null)
    setPhase('profile')
  }

  const question = diagnosticQuestions[questionIndex]
  const currentProgress = phase === 'questions' ? ((questionIndex + 1) / diagnosticQuestions.length) * 100 : 0

  return (
    <div className="checkin-page">
      <header className="checkin-header">
        <Brand />
        <div className="local-note"><ShieldCheck size={16} /> Answers stay on this device</div>
      </header>

      <main className="checkin-main">
        {phase === 'profile' && (
          <section className="checkin-panel checkin-profile">
            <div className="checkin-panel__intro">
              <div className="eyebrow">BEFORE WE BUILD YOUR PATH</div>
              <h1>Where should the practice meet you?</h1>
              <p>Choose the context you want first. You can explore every path later.</p>
            </div>

            <fieldset className="choice-fieldset">
              <legend>Your first learning lens</legend>
              <div className="role-choice-grid">
                {roles.map((item) => (
                  <label className={`role-choice ${role === item.id ? 'role-choice--selected' : ''}`} key={item.id}>
                    <input type="radio" name="role" value={item.id} checked={role === item.id} onChange={() => setRole(item.id)} />
                    <span className="role-choice__icon" style={{ background: item.color }}><RoleIcon role={item.id} /></span>
                    <span><strong>{item.label}</strong><small>{item.description}</small></span>
                    {role === item.id && <Check className="role-choice__check" size={18} />}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="choice-fieldset experience-fieldset">
              <legend>Your current experience</legend>
              <div className="experience-grid">
                {experienceOptions.map((item) => (
                  <label className={`experience-choice ${experience === item.id ? 'experience-choice--selected' : ''}`} key={item.id}>
                    <input type="radio" name="experience" checked={experience === item.id} onChange={() => setExperience(item.id)} />
                    <strong>{item.label}</strong>
                    <span>{item.description}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="checkin-actions">
              <Link className="text-link" to="/">Back home</Link>
              <button className="button button--ink button--large" type="button" onClick={startQuestions}>
                Start the check-in <ArrowRight size={18} />
              </button>
            </div>
          </section>
        )}

        {phase === 'questions' && question && (
          <section className="checkin-panel diagnostic-panel">
            <div className="diagnostic-progress">
              <button className="icon-button" type="button" onClick={goBackQuestion} aria-label="Previous question"><ArrowLeft /></button>
              <div>
                <span>Question {questionIndex + 1} of {diagnosticQuestions.length}</span>
                <div className="thin-progress" aria-hidden="true"><span style={{ width: `${currentProgress}%` }} /></div>
              </div>
              <span>{competencyLabels[question.competency]}</span>
            </div>

            <div className="diagnostic-question">
              <div className="scenario-context">{question.context}</div>
              <h1>{question.prompt}</h1>
              <fieldset className="diagnostic-options">
                <legend className="sr-only">Choose one answer</legend>
                {question.options.map((option, index) => (
                  <label className={`diagnostic-option ${selectedOption === option.id ? 'diagnostic-option--selected' : ''}`} key={option.id}>
                    <input type="radio" name="diagnostic-answer" checked={selectedOption === option.id} onChange={() => setSelectedOption(option.id)} />
                    <span className="diagnostic-option__letter">{String.fromCharCode(65 + index)}</span>
                    <span>{option.label}</span>
                    {selectedOption === option.id && <Check size={18} />}
                  </label>
                ))}
              </fieldset>

              {selectedOption && (
                <fieldset className="confidence-check">
                  <legend>How confident are you?</legend>
                  <p>Confidence helps measure calibration, not just correctness.</p>
                  <div>
                    {([
                      [1, 'Unsure'], [2, 'Fairly sure'], [3, 'Very sure'],
                    ] as const).map(([value, label]) => (
                      <label key={value} className={confidence === value ? 'selected' : ''}>
                        <input type="radio" name="confidence" checked={confidence === value} onChange={() => setConfidence(value)} />
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
            </div>

            <div className="diagnostic-footer">
              <span>No tricks. Choose the action you would really take.</span>
              <button className="button button--coral" type="button" disabled={!selectedOption || !confidence} onClick={submitAnswer}>
                {questionIndex === diagnosticQuestions.length - 1 ? 'See my path' : 'Next question'}
                <ArrowRight size={17} />
              </button>
            </div>
          </section>
        )}

        {phase === 'results' && (
          <section className="checkin-panel results-panel">
            <div className="results-badge"><Check size={22} /></div>
            <div className="eyebrow">YOUR STARTING POINT</div>
            <h1>You already have judgment to build on.</h1>
            <p className="results-lede">Your path will start with <strong>{competencyLabels[sortedSkills.at(-1)?.[0] ?? 'understand'].toLowerCase()}</strong> and use your strongest skill—<strong>{competencyLabels[sortedSkills[0]?.[0] ?? 'decide'].toLowerCase()}</strong>—as an anchor.</p>

            <div className="results-scores">
              {sortedSkills.map(([skill, score], index) => (
                <ProgressBar key={skill} value={score} label={competencyLabels[skill]} tone={index === 0 ? 'lime' : index === sortedSkills.length - 1 ? 'coral' : 'green'} />
              ))}
            </div>

            <div className="results-note">
              <strong>This is a routing signal, not a certification.</strong>
              <span>Six decisions are enough to choose a starting point—not to make a broad claim about ability.</span>
            </div>

            <div className="checkin-actions">
              <button className="text-link text-link--button" type="button" onClick={retake}>Retake check-in</button>
              <button className="button button--ink button--large" type="button" onClick={() => navigate('/home')}>
                Open my path <ArrowRight size={18} />
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
