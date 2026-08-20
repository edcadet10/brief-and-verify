import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { modules } from '../data/modules'
import {
  createInitialState,
  makeEvent,
  normalizeScenarioScore,
  scoreDiagnostic,
} from '../lib/engine'
import { isLearnerState } from '../lib/stateValidation'
import { LocalStorageAdapter } from '../lib/storage/localStorageAdapter'
import type {
  DiagnosticAnswer,
  ExperienceLevel,
  FieldExperiment,
  LearnerState,
  RoleId,
  Scenario,
  StudioDraft,
} from '../types'

const storage = new LocalStorageAdapter<unknown>('brief-and-verify:learner:v1')

interface LearnerContextValue {
  state: LearnerState
  setProfile: (role: RoleId, experience: ExperienceLevel) => void
  finishDiagnostic: (answers: DiagnosticAnswer[]) => void
  startModule: (moduleId: string) => void
  finishModule: (moduleId: string, score: number) => void
  finishScenario: (scenario: Scenario, choices: string[], rawScore: number) => void
  toggleSavedResource: (resourceId: string) => void
  updateStudioDraft: (draft: StudioDraft) => void
  recordKitExport: (moduleCount: number) => void
  createFieldExperiment: (experiment: FieldExperiment) => void
  reflectOnFieldExperiment: (
    result: NonNullable<FieldExperiment['result']>,
    reflection: string,
  ) => void
  importState: (nextState: unknown) => boolean
  reset: () => void
}

const LearnerContext = createContext<LearnerContextValue | null>(null)

export function LearnerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LearnerState>(() => {
    const stored = storage.read()
    return isLearnerState(stored) ? stored : createInitialState()
  })

  useEffect(() => {
    storage.write(state)
  }, [state])

  const setProfile = useCallback((role: RoleId, experience: ExperienceLevel) => {
    setState((current) => ({
      ...current,
      onboarded: true,
      role,
      experience,
      studioDraft: { ...current.studioDraft, role },
    }))
  }, [])

  const finishDiagnostic = useCallback((answers: DiagnosticAnswer[]) => {
    setState((current) => ({
      ...current,
      diagnosticCompleted: true,
      diagnosticAnswers: answers,
      mastery: scoreDiagnostic(answers),
      events: [
        ...current.events,
        makeEvent('diagnostic_completed', { answered: answers.length }),
      ],
    }))
  }, [])

  const startModule = useCallback((moduleId: string) => {
    setState((current) => {
      if (current.modules[moduleId] !== 'not-started') return current
      return {
        ...current,
        modules: { ...current.modules, [moduleId]: 'in-progress' },
        events: [...current.events, makeEvent('module_started', { moduleId })],
      }
    })
  }, [])

  const finishModule = useCallback((moduleId: string, score: number) => {
    setState((current) => {
      const module = modules.find((item) => item.id === moduleId)
      if (!module) return current
      const previousMastery = current.mastery[module.competency]
      const adjustedMastery = Math.max(
        previousMastery,
        Math.round(previousMastery * 0.35 + score * 0.65),
      )
      return {
        ...current,
        modules: { ...current.modules, [moduleId]: 'complete' },
        moduleScores: { ...current.moduleScores, [moduleId]: score },
        mastery: { ...current.mastery, [module.competency]: adjustedMastery },
        events: [
          ...current.events,
          makeEvent('module_completed', { moduleId, score }),
        ],
      }
    })
  }, [])

  const finishScenario = useCallback(
    (scenario: Scenario, choices: string[], rawScore: number) => {
      setState((current) => {
        const score = normalizeScenarioScore(rawScore, scenario.stages.length)
        return {
          ...current,
          scenarioAttempts: [
            ...current.scenarioAttempts,
            {
              scenarioId: scenario.id,
              choices,
              score,
              completedAt: new Date().toISOString(),
            },
          ],
          mastery: {
            ...current.mastery,
            decide: Math.max(current.mastery.decide, score),
            verify: Math.max(
              current.mastery.verify,
              Math.round(current.mastery.verify * 0.5 + score * 0.5),
            ),
          },
          events: [
            ...current.events,
            makeEvent('scenario_completed', { scenarioId: scenario.id, score }),
          ],
        }
      })
    },
    [],
  )

  const toggleSavedResource = useCallback((resourceId: string) => {
    setState((current) => {
      const isSaved = current.savedResources.includes(resourceId)
      return {
        ...current,
        savedResources: isSaved
          ? current.savedResources.filter((id) => id !== resourceId)
          : [...current.savedResources, resourceId],
        events: isSaved
          ? current.events
          : [...current.events, makeEvent('resource_saved', { resourceId })],
      }
    })
  }, [])

  const updateStudioDraft = useCallback((studioDraft: StudioDraft) => {
    setState((current) => ({ ...current, studioDraft }))
  }, [])

  const recordKitExport = useCallback((moduleCount: number) => {
    setState((current) => ({
      ...current,
      events: [...current.events, makeEvent('kit_exported', { moduleCount })],
    }))
  }, [])

  const createFieldExperiment = useCallback((fieldExperiment: FieldExperiment) => {
    setState((current) => ({
      ...current,
      fieldExperiment,
      events: [...current.events, makeEvent('field_test_created', { reviewOn: fieldExperiment.reviewOn })],
    }))
  }, [])

  const reflectOnFieldExperiment = useCallback(
    (result: NonNullable<FieldExperiment['result']>, reflection: string) => {
      setState((current) => {
        if (!current.fieldExperiment) return current
        return {
          ...current,
          fieldExperiment: { ...current.fieldExperiment, result, reflection },
          events: [
            ...current.events,
            makeEvent('field_test_reflected', { result }),
          ],
        }
      })
    },
    [],
  )

  const importState = useCallback((nextState: unknown) => {
    if (!isLearnerState(nextState)) return false
    setState(nextState)
    return true
  }, [])

  const reset = useCallback(() => {
    storage.clear()
    setState(createInitialState())
  }, [])

  const value = useMemo(
    () => ({
      state,
      setProfile,
      finishDiagnostic,
      startModule,
      finishModule,
      finishScenario,
      toggleSavedResource,
      updateStudioDraft,
      recordKitExport,
      createFieldExperiment,
      reflectOnFieldExperiment,
      importState,
      reset,
    }),
    [
      state,
      setProfile,
      finishDiagnostic,
      startModule,
      finishModule,
      finishScenario,
      toggleSavedResource,
      updateStudioDraft,
      recordKitExport,
      createFieldExperiment,
      reflectOnFieldExperiment,
      importState,
      reset,
    ],
  )

  return <LearnerContext.Provider value={value}>{children}</LearnerContext.Provider>
}

export function useLearner() {
  const context = useContext(LearnerContext)
  if (!context) throw new Error('useLearner must be used inside LearnerProvider')
  return context
}
