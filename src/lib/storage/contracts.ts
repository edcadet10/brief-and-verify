export interface StorageAdapter<T> {
  read(): T | null
  write(value: T): void
  clear(): void
}
