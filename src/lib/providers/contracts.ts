import type { Scenario, ScenarioChoice, ScenarioStage } from '../../types'

export interface PracticeTurn {
  scenarioId: string
  stage: ScenarioStage
  stageIndex: number
  totalStages: number
}

export interface PracticeFeedback {
  choiceId: string
  feedback: string
  principle: string
  score: number
}

export interface LearningAssistantProvider {
  readonly id: string
  readonly label: string
  readonly deterministic: boolean
  start(scenario: Scenario): PracticeTurn
  respond(turn: PracticeTurn, choice: ScenarioChoice): PracticeFeedback
  next(scenario: Scenario, turn: PracticeTurn): PracticeTurn | null
}
