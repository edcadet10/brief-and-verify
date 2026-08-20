import { describe, expect, it } from 'vitest'
import { diagnosticQuestions } from '../data/diagnostic'
import { modules } from '../data/modules'
import type { DiagnosticAnswer } from '../types'
import {
  calculateCalibration,
  createInitialState,
  getRecommendedModules,
  normalizeScenarioScore,
  scoreDiagnostic,
} from './engine'

const answerFor = (
  questionIndex: number,
  optionIndex: number,
  confidence: 1 | 2 | 3,
  claimedScore = 999,
): DiagnosticAnswer => {
  const question = diagnosticQuestions[questionIndex]
  const option = question.options[optionIndex]
  return {
    questionId: question.id,
    optionId: option.id,
    score: claimedScore,
    confidence,
  }
}

describe('diagnostic scoring', () => {
  it('uses authored answer keys instead of a client-supplied score', () => {
    const weakAnswerWithForgedScore = answerFor(0, 1, 3)
    const score = scoreDiagnostic([weakAnswerWithForgedScore])

    expect(score.understand).toBe(0)
    expect(Object.values(score).every((value) => value >= 0 && value <= 100)).toBe(true)
  })

  it('scores missing and unknown answers as zero', () => {
    const unknown: DiagnosticAnswer = {
      questionId: diagnosticQuestions[0].id,
      optionId: 'not-an-authored-option',
      score: 2,
      confidence: 2,
    }

    expect(scoreDiagnostic([unknown])).toEqual({
      understand: 0,
      explore: 0,
      brief: 0,
      verify: 0,
      protect: 0,
      decide: 0,
    })
  })

  it('penalizes confident errors without penalizing calibrated correct answers', () => {
    const correctAndCertain = answerFor(0, 0, 3)
    const incorrectAndCertain = answerFor(0, 1, 3)

    expect(calculateCalibration([correctAndCertain])).toBe(100)
    expect(calculateCalibration([incorrectAndCertain])).toBe(0)
  })
})

describe('path and practice calculations', () => {
  it('moves completed modules behind unfinished work', () => {
    const state = createInitialState()
    state.modules[modules[0].id] = 'complete'
    state.mastery[modules[0].competency] = 0

    const recommendation = getRecommendedModules(state)

    expect(recommendation.at(-1)?.id).toBe(modules[0].id)
  })

  it.each([
    [-1, 3, 0],
    [0, 3, 0],
    [3, 3, 50],
    [6, 3, 100],
    [100, 3, 100],
    [Number.NaN, 3, 0],
    [4, 0, 0],
  ])('keeps scenario score %s/%s within its valid range', (raw, stages, expected) => {
    expect(normalizeScenarioScore(raw, stages)).toBe(expected)
  })
})
