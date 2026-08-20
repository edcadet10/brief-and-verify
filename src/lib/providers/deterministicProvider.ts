import type { Scenario, ScenarioChoice } from '../../types'
import type {
  LearningAssistantProvider,
  PracticeFeedback,
  PracticeTurn,
} from './contracts'

export class DeterministicPracticeProvider implements LearningAssistantProvider {
  readonly id = 'deterministic-v1'
  readonly label = 'Built-in practice engine'
  readonly deterministic = true

  start(scenario: Scenario): PracticeTurn {
    const firstStage = scenario.stages[0]
    if (!firstStage) throw new Error('A practice scenario needs at least one stage.')

    return {
      scenarioId: scenario.id,
      stage: firstStage,
      stageIndex: 0,
      totalStages: scenario.stages.length,
    }
  }

  respond(turn: PracticeTurn, choice: ScenarioChoice): PracticeFeedback {
    const authoredChoice = turn.stage.choices.find((item) => item.id === choice.id)
    if (!authoredChoice) throw new Error('That choice does not belong to this practice turn.')

    return {
      choiceId: authoredChoice.id,
      feedback: authoredChoice.feedback,
      principle: authoredChoice.principle,
      score: authoredChoice.score,
    }
  }

  next(scenario: Scenario, turn: PracticeTurn): PracticeTurn | null {
    if (scenario.id !== turn.scenarioId) {
      throw new Error('The practice turn does not belong to this scenario.')
    }

    const nextIndex = turn.stageIndex + 1
    const stage = scenario.stages[nextIndex]
    if (!stage) return null

    return {
      scenarioId: scenario.id,
      stage,
      stageIndex: nextIndex,
      totalStages: scenario.stages.length,
    }
  }
}

export const practiceProvider = new DeterministicPracticeProvider()
