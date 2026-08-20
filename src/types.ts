export type RoleId =
  | 'general'
  | 'care'
  | 'education'
  | 'business'
  | 'policy'
  | 'community'

export type CompetencyId =
  | 'understand'
  | 'explore'
  | 'brief'
  | 'verify'
  | 'protect'
  | 'decide'

export type ExperienceLevel = 'new' | 'occasional' | 'regular'
export type ResourceType = 'lesson' | 'exercise' | 'one-pager' | 'scenario'
export type ModuleStatus = 'not-started' | 'in-progress' | 'complete'

export interface RoleProfile {
  id: RoleId
  label: string
  shortLabel: string
  description: string
  stakes: string
  icon: string
  color: string
}

export interface DiagnosticOption {
  id: string
  label: string
  rationale: string
  score: number
}

export interface DiagnosticQuestion {
  id: string
  competency: CompetencyId
  prompt: string
  context: string
  options: DiagnosticOption[]
}

export interface DiagnosticAnswer {
  questionId: string
  optionId: string
  score: number
  confidence: 1 | 2 | 3
}

export interface RoleExample {
  situation: string
  weakBrief: string
  strongerBrief: string
  watchFor: string
}

export interface ModuleChallenge {
  prompt: string
  options: DiagnosticOption[]
}

export interface LearningModule {
  id: string
  number: string
  title: string
  eyebrow: string
  competency: CompetencyId
  minutes: number
  summary: string
  outcome: string
  mentalModel: string
  explanation: string[]
  steps: Array<{ title: string; body: string }>
  roleExamples: Partial<Record<RoleId, RoleExample>>
  challenge: ModuleChallenge
  sourceIds: string[]
  featured?: boolean
}

export interface ScenarioChoice {
  id: string
  label: string
  feedback: string
  score: number
  principle: string
}

export interface ScenarioStage {
  id: string
  label: string
  prompt: string
  detail: string
  artifact?: string
  choices: ScenarioChoice[]
}

export interface Scenario {
  id: string
  role: RoleId
  title: string
  setting: string
  minutes: number
  difficulty: 'Foundation' | 'Applied' | 'Stretch'
  summary: string
  stakes: string
  stages: ScenarioStage[]
}

export interface ScenarioAttempt {
  scenarioId: string
  choices: string[]
  score: number
  completedAt: string
}

export interface Resource {
  id: string
  title: string
  description: string
  type: ResourceType
  competency: CompetencyId
  minutes: number
  roles: RoleId[]
  moduleId?: string
  scenarioId?: string
  takeaway: string
}

export interface ResearchSource {
  id: string
  organization: string
  title: string
  year: number
  url: string
  usedFor: string
}

export interface LearningEvent {
  id: string
  type:
    | 'diagnostic_completed'
    | 'module_started'
    | 'module_completed'
    | 'scenario_completed'
    | 'resource_saved'
    | 'kit_exported'
    | 'field_test_created'
    | 'field_test_reflected'
  timestamp: string
  detail: Record<string, string | number | boolean>
}

export interface FieldExperiment {
  task: string
  safeguard: string
  successSignal: string
  createdAt: string
  reviewOn: string
  reflection?: string
  result?: 'helped' | 'mixed' | 'did-not-help'
}

export interface StudioDraft {
  title: string
  goal: string
  role: RoleId
  minutes: 15 | 30 | 45 | 60
  format: 'self-paced' | 'team-session' | 'workshop'
  moduleIds: string[]
}

export interface LearnerState {
  version: 1
  onboarded: boolean
  role: RoleId
  experience: ExperienceLevel
  diagnosticCompleted: boolean
  diagnosticAnswers: DiagnosticAnswer[]
  mastery: Record<CompetencyId, number>
  modules: Record<string, ModuleStatus>
  moduleScores: Record<string, number>
  scenarioAttempts: ScenarioAttempt[]
  savedResources: string[]
  events: LearningEvent[]
  fieldExperiment?: FieldExperiment
  studioDraft: StudioDraft
}
