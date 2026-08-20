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
    description: 'A printable five-part guide for defining the job, context, sources, limits, and finish line.',
    type: 'one-pager',
    competency: 'brief',
    minutes: 5,
    roles: allRoles,
    takeaway: 'If a detail changes the result, put it in the brief.',
  },
  {
    id: 'one-pager-risk-ladder',
    title: 'The review ladder',
    description: 'Choose how strongly to check the work based on the possible harm, privacy needs, and what is still unknown.',
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
    description: 'Mark which steps AI may help with, which need review, and which must stay human-only.',
    type: 'exercise',
    competency: 'explore',
    minutes: 7,
    roles: allRoles,
    takeaway: 'Getting help, receiving a suggestion, and making the decision are different things.',
  },
  {
    id: 'one-pager-data-pause',
    title: 'The data pause',
    description: 'A checklist for permission, private information, sharing less data, consent, deletion, and correcting errors.',
    type: 'one-pager',
    competency: 'protect',
    minutes: 4,
    roles: allRoles,
    takeaway: 'Get permission. Share only what is needed. Let people question the result.',
  },
  {
    id: 'exercise-seven-day-test',
    title: 'Seven-day field test',
    description: 'Try one small task, set a safety rule and a sign of success, then record what happened.',
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
