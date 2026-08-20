import { diagnosticQuestions } from '../data/diagnostic'
import { modules } from '../data/modules'
import type {
  CompetencyId,
  DiagnosticAnswer,
  LearnerState,
  LearningEvent,
  ModuleStatus,
  RoleId,
} from '../types'

export const competencyLabels: Record<CompetencyId, string> = {
  understand: 'Understand',
  explore: 'Choose',
  brief: 'Brief',
  verify: 'Verify',
  protect: 'Protect',
  decide: 'Decide',
}

export const competencyDescriptions: Record<CompetencyId, string> = {
  understand: 'Recognize capabilities and limits',
  explore: 'Match assistance to the task and stakes',
  brief: 'Define the job, evidence, and boundaries',
  verify: 'Test consequential claims and omissions',
  protect: 'Respect privacy, consent, and agency',
  decide: 'Retain authority, records, and fallbacks',
}

export const emptyMastery = (): Record<CompetencyId, number> => ({
  understand: 0,
  explore: 0,
  brief: 0,
  verify: 0,
  protect: 0,
  decide: 0,
})

export const createInitialState = (): LearnerState => ({
  version: 1,
  onboarded: false,
  role: 'general',
  experience: 'new',
  diagnosticCompleted: false,
  diagnosticAnswers: [],
  mastery: emptyMastery(),
  modules: Object.fromEntries(
    modules.map((module) => [module.id, 'not-started' satisfies ModuleStatus]),
  ),
  moduleScores: {},
  scenarioAttempts: [],
  savedResources: [],
  events: [],
  studioDraft: {
    title: 'Practical AI judgment starter',
    goal: 'Help learners make one safer, more useful decision with AI this week.',
    role: 'general',
    minutes: 30,
    format: 'self-paced',
    moduleIds: ['patterns-not-proof', 'write-the-brief', 'verify-what-matters'],
  },
})

const observedDiagnosticScore = (answer: DiagnosticAnswer): number => {
  const question = diagnosticQuestions.find((item) => item.id === answer.questionId)
  const option = question?.options.find((item) => item.id === answer.optionId)
  return option?.score ?? 0
}

export const scoreDiagnostic = (
  answers: DiagnosticAnswer[],
): Record<CompetencyId, number> => {
  const mastery = emptyMastery()

  diagnosticQuestions.forEach((question) => {
    const answer = answers.find((item) => item.questionId === question.id)
    mastery[question.competency] = answer
      ? Math.round((observedDiagnosticScore(answer) / 2) * 100)
      : 0
  })

  return mastery
}

export const getRecommendedModules = (state: LearnerState) => {
  const statusWeight: Record<ModuleStatus, number> = {
    'in-progress': -30,
    'not-started': 0,
    complete: 200,
  }

  return [...modules].sort((a, b) => {
    const aStatus = state.modules[a.id] ?? 'not-started'
    const bStatus = state.modules[b.id] ?? 'not-started'
    const aScore = statusWeight[aStatus] + state.mastery[a.competency]
    const bScore = statusWeight[bStatus] + state.mastery[b.competency]

    if (aScore !== bScore) return aScore - bScore
    return Number(a.number) - Number(b.number)
  })
}

export const calculateCalibration = (answers: DiagnosticAnswer[]): number => {
  if (!answers.length) return 0

  const error = answers.reduce((sum, answer) => {
    const statedConfidence = Math.min(3, Math.max(1, answer.confidence)) / 3
    const observedPerformance = observedDiagnosticScore(answer) / 2
    return sum + Math.abs(statedConfidence - observedPerformance)
  }, 0)

  return Math.max(0, Math.round((1 - error / answers.length) * 100))
}

export const calculatePracticeScore = (state: LearnerState): number => {
  const moduleValues = Object.values(state.moduleScores)
  const scenarioValues = state.scenarioAttempts.map((attempt) => attempt.score)
  const values = [...moduleValues, ...scenarioValues]
  if (!values.length) return 0
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)
}

export const calculateCompletion = (state: LearnerState): number => {
  const complete = Object.values(state.modules).filter((status) => status === 'complete').length
  return Math.round((complete / modules.length) * 100)
}

export const calculateMasteryAverage = (state: LearnerState): number => {
  const values = Object.values(state.mastery)
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)
}

export const normalizeScenarioScore = (rawScore: number, stages: number): number => {
  if (!Number.isFinite(rawScore) || !Number.isFinite(stages) || stages <= 0) return 0
  const maximum = stages * 2
  return Math.round((Math.min(maximum, Math.max(0, rawScore)) / maximum) * 100)
}

export const makeEvent = (
  type: LearningEvent['type'],
  detail: LearningEvent['detail'],
): LearningEvent => ({
  id:
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  type,
  timestamp: new Date().toISOString(),
  detail,
})

export const rolePathTitle = (role: RoleId): string => {
  const titles: Record<RoleId, string> = {
    general: 'Everyday judgment path',
    care: 'Care & health services path',
    education: 'Education path',
    business: 'Small-business path',
    policy: 'Policy & public-service path',
    community: 'Community-leadership path',
  }
  return titles[role]
}
