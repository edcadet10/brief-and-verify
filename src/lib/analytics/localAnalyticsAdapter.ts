import type { LearningEvent } from '../../types'
import type { LearningAnalyticsAdapter } from './contracts'

export class LocalAnalyticsAdapter implements LearningAnalyticsAdapter {
  constructor(private readonly getEvents: () => LearningEvent[]) {}

  track(event: LearningEvent): void {
    // State persistence records events. This adapter exists so a consent-aware
    // aggregate implementation can be supplied without changing learning flows.
    void event
  }

  list(): LearningEvent[] {
    return this.getEvents()
  }
}
