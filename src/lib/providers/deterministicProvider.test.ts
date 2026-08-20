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

  it('counterbalances strongest choices instead of teaching a position pattern', () => {
    const strongestPositionPatterns = scenarios.map((scenario) =>
      scenario.stages.map((stage) =>
        stage.choices.findIndex((choice) => choice.score === 2),
      ),
    )

    for (const pattern of strongestPositionPatterns) {
      expect([...pattern].sort()).toEqual([0, 1, 2])
    }
    expect(new Set(strongestPositionPatterns.map((pattern) => pattern.join(','))).size)
      .toBe(scenarios.length)

    for (let stageIndex = 0; stageIndex < 3; stageIndex += 1) {
      const counts = [0, 0, 0]
      for (const pattern of strongestPositionPatterns) counts[pattern[stageIndex]] += 1
      expect(counts).toEqual([2, 2, 2])
    }

    const maximumScore = scenarios.reduce(
      (total, scenario) => total + scenario.stages.length * 2,
      0,
    )
    for (let fixedPosition = 0; fixedPosition < 3; fixedPosition += 1) {
      const score = scenarios.reduce(
        (total, scenario) => total + scenario.stages.reduce(
          (scenarioTotal, stage) => scenarioTotal + stage.choices[fixedPosition].score,
          0,
        ),
        0,
      )
      expect(Math.round((score / maximumScore) * 100)).toBeLessThan(80)
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
