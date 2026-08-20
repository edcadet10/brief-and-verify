import { ArrowLeft, Download, Printer } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { resourceGuides } from '../data/resourceGuides'
import { resources } from '../data/resources'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const downloadText = (filename: string, content: string) => {
  const url = URL.createObjectURL(new Blob([content], { type: 'text/markdown;charset=utf-8' }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export function ResourcePage() {
  const { resourceId = '' } = useParams()
  const resource = resources.find((item) => item.id === resourceId)
  const guide = resourceGuides[resourceId]
  useDocumentTitle(resource?.title ?? 'Resource')

  if (!resource || !guide) return <Navigate to="/library" replace />

  const markdown = `# ${resource.title}\n\n${guide.intro}\n\n${guide.sections.map((section) => `## ${section.title}\n\n${section.prompt}${section.example ? `\n\nExample: ${section.example}` : ''}`).join('\n\n')}\n\n---\n\n${guide.closing}\n\nFrom Brief & Verify. Curriculum licensed CC BY 4.0.\n`

  return (
    <div className="resource-page page-narrow">
      <div className="resource-page__nav"><Link to="/library"><ArrowLeft size={16} /> Library</Link><div><button type="button" onClick={() => window.print()}><Printer size={16} /> Print</button><button type="button" onClick={() => downloadText(`${resource.id}.md`, markdown)}><Download size={16} /> Download</button></div></div>
      <header className="resource-page__hero"><span>{resource.type.replace('-', ' ')} · {resource.minutes} min</span><h1>{resource.title}</h1><p>{guide.intro}</p></header>
      <article className="worksheet">
        {guide.sections.map((section) => (
          <section key={section.title}><h2>{section.title}</h2><p>{section.prompt}</p>{section.example && <div className="worksheet__example"><span>EXAMPLE</span>{section.example}</div>}<div className="worksheet__lines" aria-hidden="true"><span /><span /><span /></div></section>
        ))}
        <footer><strong>Keep this:</strong><p>{guide.closing}</p></footer>
      </article>
      <p className="resource-license">Brief &amp; Verify curriculum · CC BY 4.0 · Adapt and attribute.</p>
    </div>
  )
}
