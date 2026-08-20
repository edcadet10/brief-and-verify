import type { Resource } from '../types'
import { modules } from './modules'
import { scenarios } from './scenarios'

const allRoles: Resource['roles'] = ['general', 'care', 'education', 'business', 'policy', 'community']

const moduleResources: Resource[] = modules.map((module) => ({
  id: `resource-${module.id}`,
  title: module.title,
  description: module.summary,
  type: 'lesson',
  competency: module.competency,
  minutes: module.minutes,
  roles: allRoles,
  moduleId: module.id,
  takeaway: module.mentalModel,
}))

const scenarioResources: Resource[] = scenarios.map((scenario) => ({
  id: `resource-${scenario.id}`,
  title: scenario.title,
  description: scenario.summary,
  type: 'scenario',
  competency: 'decide',
  minutes: scenario.minutes,
  roles: [scenario.role],
  scenarioId: scenario.id,
  takeaway: scenario.stakes,
}))

const standaloneResources: Resource[] = [
  {
    id: 'one-pager-brief-canvas',
    title: 'The brief canvas',
    description: 'A printable five-part canvas for defining the job, context, evidence, boundaries, and finish line.',
    type: 'one-pager',
    competency: 'brief',
    minutes: 5,
    roles: allRoles,
    takeaway: 'If a detail changes the result, put it in the brief.',
  },
  {
    id: 'one-pager-risk-ladder',
    title: 'The review ladder',
    description: 'Choose a review level using consequence, reversibility, sensitivity, and uncertainty.',
    type: 'one-pager',
    competency: 'verify',
    minutes: 4,
    roles: allRoles,
    takeaway: 'Review effort should follow the cost of being wrong.',
  },
  {
    id: 'exercise-hidden-assumption',
    title: 'Find the hidden assumption',
    description: 'Turn a polished recommendation into a list of claims, assumptions, unknowns, and tests.',
    type: 'exercise',
    competency: 'verify',
    minutes: 8,
    roles: allRoles,
    takeaway: 'A recommendation is only as sound as the assumptions carrying it.',
  },
  {
    id: 'exercise-decision-boundary',
    title: 'Draw the decision boundary',
    description: 'Mark which workflow steps may be assisted, which require review, and which remain human-only.',
    type: 'exercise',
    competency: 'explore',
    minutes: 7,
    roles: allRoles,
    takeaway: 'Assistance, recommendation, and authority are separate design choices.',
  },
  {
    id: 'one-pager-data-pause',
    title: 'The data pause',
    description: 'A pre-use checklist for authorization, sensitivity, minimization, consent, retention, and recourse.',
    type: 'one-pager',
    competency: 'protect',
    minutes: 4,
    roles: allRoles,
    takeaway: 'Permission first. Minimum necessary. People can contest.',
  },
  {
    id: 'exercise-seven-day-test',
    title: 'Seven-day field test',
    description: 'Try one bounded workflow, define a safeguard and success signal, then record what actually happened.',
    type: 'exercise',
    competency: 'decide',
    minutes: 10,
    roles: allRoles,
    takeaway: 'A saved minute is useful; a changed practice is evidence.',
  },
]

export const resources: Resource[] = [
  ...moduleResources,
  ...standaloneResources,
  ...scenarioResources,
]
