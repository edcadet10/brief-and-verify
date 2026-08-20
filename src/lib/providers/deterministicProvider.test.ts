import { describe, expect, it } from 'vitest'
import { scenarios } from '../../data/scenarios'
import type { ScenarioChoice } from '../../types'
import { DeterministicPracticeProvider } from './deterministicProvider'

describe('DeterministicPracticeProvider', () => {
  const provider = new DeterministicPracticeProvider()

  it('walks every authored scenario from the first stage through completion', () => {
    for (const scenario of scenarios) {
      let turn = provider.start(scenario)

      expect(turn.stage).toBe(scenario.stages[0])
      expect(turn.totalStages).toBe(scenario.stages.length)

      for (let index = 0; index < scenario.stages.length; index += 1) {
        expect(turn.stageIndex).toBe(index)
        expect(turn.stage.choices.length).toBeGreaterThanOrEqual(2)

        for (const choice of turn.stage.choices) {
          const feedback = provider.respond(turn, choice)
          expect(feedback).toEqual({
            choiceId: choice.id,
            feedback: choice.feedback,
            principle: choice.principle,
            score: choice.score,
          })
          expect(feedback.score).toBeGreaterThanOrEqual(0)
          expect(feedback.score).toBeLessThanOrEqual(2)
        }

        const next = provider.next(scenario, turn)
        if (index === scenario.stages.length - 1) {
          expect(next).toBeNull()
        } else {
          expect(next).not.toBeNull()
          turn = next!
        }
      }
    }
  })

  it('returns the authored consequence even if a caller tampers with choice fields', () => {
    const scenario = scenarios[0]
    const turn = provider.start(scenario)
    const authored = turn.stage.choices[0]
    const tampered: ScenarioChoice = {
      ...authored,
      feedback: 'Forged feedback',
      principle: 'Forged principle',
      score: 99,
    }

    expect(provider.respond(turn, tampered)).toEqual({
      choiceId: authored.id,
      feedback: authored.feedback,
      principle: authored.principle,
      score: authored.score,
    })
  })

  it('rejects choices and turns from a different branch', () => {
    const firstScenario = scenarios[0]
    const secondScenario = scenarios[1]
    const firstTurn = provider.start(firstScenario)
    const foreignChoice = secondScenario.stages[0].choices[0]

    expect(() => provider.respond(firstTurn, foreignChoice)).toThrow(/does not belong/)
    expect(() => provider.next(secondScenario, firstTurn)).toThrow(/does not belong/)
  })
})
