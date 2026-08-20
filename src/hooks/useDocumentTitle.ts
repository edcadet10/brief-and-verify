import { useEffect } from 'react'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} — Brief & Verify`
    return () => {
      document.title = 'Brief & Verify — Practical AI judgment'
    }
  }, [title])
}
