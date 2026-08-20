import { ArrowRight, Bookmark, BookmarkCheck, Filter, Library, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLearner } from '../context/LearnerContext'
import { roles } from '../data/roles'
import { resources } from '../data/resources'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { competencyLabels } from '../lib/engine'
import type { Resource, ResourceType, RoleId } from '../types'

const typeLabels: Record<ResourceType | 'all', string> = {
  all: 'All formats', lesson: 'Labs', exercise: 'Exercises', 'one-pager': 'One-pagers', scenario: 'Scenarios',
}

const resourceHref = (resource: Resource) =>
  resource.moduleId ? `/lesson/${resource.moduleId}` : resource.scenarioId ? `/practice/${resource.scenarioId}` : `/resource/${resource.id}`

export function LibraryPage() {
  const { state, toggleSavedResource } = useLearner()
  useDocumentTitle('Library')
  const [query, setQuery] = useState('')
  const [type, setType] = useState<ResourceType | 'all'>('all')
  const [role, setRole] = useState<RoleId | 'all'>('all')
  const [savedOnly, setSavedOnly] = useState(false)

  const filtered = useMemo(() => resources.filter((resource) => {
    const matchesQuery = `${resource.title} ${resource.description} ${resource.takeaway}`.toLowerCase().includes(query.toLowerCase())
    const matchesType = type === 'all' || resource.type === type
    const matchesRole = role === 'all' || resource.roles.includes(role)
    const matchesSaved = !savedOnly || state.savedResources.includes(resource.id)
    return matchesQuery && matchesType && matchesRole && matchesSaved
  }), [query, role, savedOnly, state.savedResources, type])

  return (
    <div className="page library-page">
      <section className="page-hero page-hero--library">
        <div><div className="eyebrow"><Library size={16} /> OPEN RESOURCE LIBRARY</div><h1>Take a piece. Make it fit.</h1><p>Short labs, exercises, one-pagers, and scenarios—built as reusable modules rather than one locked course.</p></div>
        <div className="library-count"><strong>{resources.length}</strong><span>open resources</span><small>Code: MIT · Curriculum: CC BY 4.0</small></div>
      </section>

      <section className="library-controls" aria-label="Filter resources">
        <label className="search-field"><Search size={18} /><span className="sr-only">Search resources</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a skill or situation" /></label>
        <label><Filter size={17} /><span className="sr-only">Format</span><select value={type} onChange={(event) => setType(event.target.value as ResourceType | 'all')}>{Object.entries(typeLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
        <label><span className="sr-only">Audience lens</span><select value={role} onChange={(event) => setRole(event.target.value as RoleId | 'all')}><option value="all">All audiences</option>{roles.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}</select></label>
        <button className={`saved-filter ${savedOnly ? 'saved-filter--active' : ''}`} type="button" onClick={() => setSavedOnly((value) => !value)} aria-pressed={savedOnly}><Bookmark size={17} /> Saved</button>
      </section>

      <div className="library-results-meta"><span>{filtered.length} resources</span><button type="button" onClick={() => { setQuery(''); setType('all'); setRole('all'); setSavedOnly(false) }}>Clear filters</button></div>

      {filtered.length ? (
        <section className="resource-grid">
          {filtered.map((resource) => {
            const saved = state.savedResources.includes(resource.id)
            return (
              <article className="resource-card" key={resource.id}>
                <div className="resource-card__meta"><span>{typeLabels[resource.type]}</span><span>{resource.minutes} min</span></div>
                <h2>{resource.title}</h2>
                <p>{resource.description}</p>
                <blockquote>{resource.takeaway}</blockquote>
                <div className="resource-card__footer">
                  <span>{competencyLabels[resource.competency]}</span>
                  <div>
                    <button type="button" aria-label={saved ? `Remove ${resource.title} from saved resources` : `Save ${resource.title}`} onClick={() => toggleSavedResource(resource.id)}>{saved ? <BookmarkCheck /> : <Bookmark />}</button>
                    <Link to={resourceHref(resource)} aria-label={`Open ${resource.title}`}><ArrowRight /></Link>
                  </div>
                </div>
              </article>
            )
          })}
        </section>
      ) : (
        <section className="empty-state"><Search size={30} /><h2>No resource matches that filter.</h2><p>Clear a filter or try a broader phrase.</p></section>
      )}
    </div>
  )
}
