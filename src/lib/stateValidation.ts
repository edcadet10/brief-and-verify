import { modules } from '../data/modules'
import type {
  CompetencyId,
  ExperienceLevel,
  LearnerState,
  LearningEvent,
  ModuleStatus,
  RoleId,
  StudioDraft,
} from '../types'

const roleIds: RoleId[] = ['general', 'care', 'education', 'business', 'policy', 'community']
const experienceLevels: ExperienceLevel[] = ['new', 'occasional', 'regular']
const competencyIds: CompetencyId[] = ['understand', 'explore', 'brief', 'verify', 'protect', 'decide']
const moduleStatuses: ModuleStatus[] = ['not-started', 'in-progress', 'complete']
const studioMinutes: StudioDraft['minutes'][] = [15, 30, 45, 60]
const studioFormats: StudioDraft['format'][] = ['self-paced', 'team-session', 'workshop']
const eventTypes: LearningEvent['type'][] = [
  'diagnostic_completed',
  'module_started',
  'module_completed',
  'scenario_completed',
  'resource_saved',
  'kit_exported',
  'field_test_created',
  'field_test_reflected',
]

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value)

const isBoundedNumber = (value: unknown, minimum: number, maximum: number) =>
  typeof value === 'number' && Number.isFinite(value) && value >= minimum && value <= maximum

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')

const isDiagnosticAnswer = (value: unknown) =>
  isRecord(value) &&
  typeof value.questionId === 'string' &&
  typeof value.optionId === 'string' &&
  isBoundedNumber(value.score, 0, 2) &&
  (value.confidence === 1 || value.confidence === 2 || value.confidence === 3)

const isScenarioAttempt = (value: unknown) =>
  isRecord(value) &&
  typeof value.scenarioId === 'string' &&
  isStringArray(value.choices) &&
  isBoundedNumber(value.score, 0, 100) &&
  typeof value.completedAt === 'string'

const isLearningEvent = (value: unknown) =>
  isRecord(value) &&
  typeof value.id === 'string' &&
  eventTypes.includes(value.type as LearningEvent['type']) &&
  typeof value.timestamp === 'string' &&
  isRecord(value.detail) &&
  Object.values(value.detail).every(
    (item) =>
      typeof item === 'string' ||
      typeof item === 'boolean' ||
      (typeof item === 'number' && Number.isFinite(item)),
  )

const isStudioDraft = (value: unknown) =>
  isRecord(value) &&
  typeof value.title === 'string' &&
  typeof value.goal === 'string' &&
  roleIds.includes(value.role as RoleId) &&
  studioMinutes.includes(value.minutes as StudioDraft['minutes']) &&
  studioFormats.includes(value.format as StudioDraft['format']) &&
  isStringArray(value.moduleIds) &&
  value.moduleIds.every((moduleId) => modules.some((module) => module.id === moduleId))

const isFieldExperiment = (value: unknown) => {
  if (value === undefined) return true
  if (!isRecord(value)) return false
  const resultIsValid =
    value.result === undefined ||
    value.result === 'helped' ||
    value.result === 'mixed' ||
    value.result === 'did-not-help'
  return (
    typeof value.task === 'string' &&
    typeof value.safeguard === 'string' &&
    typeof value.successSignal === 'string' &&
    typeof value.createdAt === 'string' &&
    typeof value.reviewOn === 'string' &&
    (value.reflection === undefined || typeof value.reflection === 'string') &&
    resultIsValid
  )
}

export const isLearnerState = (value: unknown): value is LearnerState => {
  if (!isRecord(value) || value.version !== 1) return false
  if (!isRecord(value.mastery) || !isRecord(value.modules) || !isRecord(value.moduleScores)) return false
  const mastery = value.mastery
  const moduleState = value.modules
  const moduleScores = value.moduleScores

  const masteryIsValid = competencyIds.every((competency) =>
    isBoundedNumber(mastery[competency], 0, 100),
  )
  const moduleStateIsValid = modules.every((module) =>
    moduleStatuses.includes(moduleState[module.id] as ModuleStatus),
  )
  const moduleScoresAreValid = Object.values(moduleScores).every((score) =>
    isBoundedNumber(score, 0, 100),
  )

  return (
    typeof value.onboarded === 'boolean' &&
    roleIds.includes(value.role as RoleId) &&
    experienceLevels.includes(value.experience as ExperienceLevel) &&
    typeof value.diagnosticCompleted === 'boolean' &&
    Array.isArray(value.diagnosticAnswers) &&
    value.diagnosticAnswers.every(isDiagnosticAnswer) &&
    masteryIsValid &&
    moduleStateIsValid &&
    moduleScoresAreValid &&
    Array.isArray(value.scenarioAttempts) &&
    value.scenarioAttempts.every(isScenarioAttempt) &&
    isStringArray(value.savedResources) &&
    Array.isArray(value.events) &&
    value.events.every(isLearningEvent) &&
    isFieldExperiment(value.fieldExperiment) &&
    isStudioDraft(value.studioDraft)
  )
}
