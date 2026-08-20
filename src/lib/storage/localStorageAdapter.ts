import type { StorageAdapter } from './contracts'

export class LocalStorageAdapter<T> implements StorageAdapter<T> {
  constructor(private readonly key: string) {}

  read(): T | null {
    try {
      const value = window.localStorage.getItem(this.key)
      return value ? (JSON.parse(value) as T) : null
    } catch {
      return null
    }
  }

  write(value: T): void {
    try {
      window.localStorage.setItem(this.key, JSON.stringify(value))
    } catch {
      // A blocked or full storage area should not prevent the lesson from running.
    }
  }

  clear(): void {
    try {
      window.localStorage.removeItem(this.key)
    } catch {
      // Keep reset safe in restricted browser contexts.
    }
  }
}
