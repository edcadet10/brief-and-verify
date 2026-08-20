import { describe, expect, it } from 'vitest'
import { createInitialState } from './engine'
import { isLearnerState } from './stateValidation'

describe('learner state validation', () => {
  it('accepts a complete state produced by the application', () => {
    expect(isLearnerState(createInitialState())).toBe(true)
  })

  it('rejects the shallow shape that could previously pass import checks', () => {
    expect(isLearnerState({
      version: 1,
      onboarded: true,
      role: 'general',
      events: [],
      mastery: {},
    })).toBe(false)
  })

  it('rejects out-of-range scores and unknown module states', () => {
    const forgedScore = createInitialState()
    forgedScore.mastery.verify = 900
    expect(isLearnerState(forgedScore)).toBe(false)

    const unknownStatus = createInitialState()
    unknownStatus.modules['patterns-not-proof'] = 'complete-ish' as 'complete'
    expect(isLearnerState(unknownStatus)).toBe(false)
  })

  it('rejects malformed nested events and studio modules', () => {
    const malformedEvent = createInitialState()
    malformedEvent.events.push({
      id: 'event',
      type: 'module_completed',
      timestamp: 'today',
      detail: { score: Number.NaN },
    })
    expect(isLearnerState(malformedEvent)).toBe(false)

    const unknownStudioModule = createInitialState()
    unknownStudioModule.studioDraft.moduleIds.push('unknown-module')
    expect(isLearnerState(unknownStudioModule)).toBe(false)
  })
})
