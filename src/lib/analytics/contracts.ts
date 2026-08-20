import type { LearningEvent } from '../../types'

export interface LearningAnalyticsAdapter {
  track(event: LearningEvent): void
  list(): LearningEvent[]
}
