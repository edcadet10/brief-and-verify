import {
  ArrowRight,
  Check,
  Clipboard,
  Download,
  FileJson,
  Layers3,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { RoleIcon } from '../components/RoleIcon'
import { useLearner } from '../context/LearnerContext'
import { modules } from '../data/modules'
import { getRole, roles } from '../data/roles'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import type { CompetencyId, RoleId, StudioDraft } from '../types'

const priorityByRole: Record<RoleId, CompetencyId[]> = {
  general: ['understand', 'brief', 'verify', 'decide', 'protect', 'explore'],
  care: ['protect', 'verify', 'decide', 'brief', 'understand', 'explore'],
  education: ['brief', 'protect', 'verify', 'decide', 'understand', 'explore'],
  business: ['explore', 'brief', 'verify', 'protect', 'decide', 'understand'],
  policy: ['verify', 'decide', 'protect', 'understand', 'brief', 'explore'],
  community: ['protect', 'brief', 'verify', 'decide', 'understand', 'explore'],
}

const formats: Array<{ id: StudioDraft['format']; label: string; description: string }> = [
  { id: 'self-paced', label: 'Self-paced', description: 'Individual reading and practice' },
  { id: 'team-session', label: 'Team session', description: 'Facilitated discussion and scenario' },
  { id: 'workshop', label: 'Workshop', description: 'Make something, then reflect' },
]

const suggestModules = (role: RoleId, budget: StudioDraft['minutes']) => {
  const priorities = priorityByRole[role]
  const ordered = [...modules].sort((a, b) => priorities.indexOf(a.competency) - priorities.indexOf(b.competency))
  const selected: string[] = []
  let used = 0
  ordered.forEach((module) => {
    if (used + module.minutes <= budget || selected.length === 0) {
      selected.push(module.id)
      used += module.minutes
    }
  })
  return selected
}

const saveBlob = (filename: string, value: string, type: string) => {
  const url = URL.createObjectURL(new Blob([value], { type }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export function StudioPage() {
  const { state, updateStudioDraft, recordKitExport } = useLearner()
  useDocumentTitle('Build a lesson')
  const draft = state.studioDraft
  const [copied, setCopied] = useState(false)
  const selectedModules = useMemo(() => modules.filter((module) => draft.moduleIds.includes(module.id)), [draft.moduleIds])
  const totalMinutes = selectedModules.reduce((sum, module) => sum + module.minutes, 0)
  const role = getRole(draft.role)

  const patchDraft = (patch: Partial<StudioDraft>) => updateStudioDraft({ ...draft, ...patch })

  const handleSuggest = () => patchDraft({ moduleIds: suggestModules(draft.role, draft.minutes) })

  const toggleModule = (moduleId: string) => {
    patchDraft({
      moduleIds: draft.moduleIds.includes(moduleId)
        ? draft.moduleIds.filter((id) => id !== moduleId)
        : [...draft.moduleIds, moduleId],
    })
  }

  const facilitatorGuide = `# ${draft.title}\n\n**Audience:** ${role.label}\n**Format:** ${formats.find((item) => item.id === draft.format)?.label}\n**Estimated time:** ${totalMinutes} minutes\n\n## Learning goal\n\n${draft.goal}\n\n## Session plan\n\n${selectedModules.map((module, index) => `${index + 1}. **${module.title}** (${module.minutes} min)\n   - Goal: ${module.outcome}\n   - Key idea: ${module.mentalModel}\n   - Discussion prompt: ${module.roleExamples[draft.role]?.situation ?? module.roleExamples.general?.situation}`).join('\n\n')}\n\n## Teaching notes\n\n- Ask learners to choose before you show the feedback.\n- Ask when the idea might fail and what is different in this group’s setting.\n- Do not treat practice scores as proof of workplace skill.\n- End with one small, low-risk test to try over seven days.\n\n## License\n\nAdapted from Brief & Verify curriculum, licensed CC BY 4.0.\n`

  const exportMarkdown = () => {
    recordKitExport(selectedModules.length)
    saveBlob('brief-and-verify-facilitator-guide.md', facilitatorGuide, 'text/markdown;charset=utf-8')
  }

  const exportJson = () => {
    recordKitExport(selectedModules.length)
    saveBlob(
      'brief-and-verify-content-pack.json',
      JSON.stringify({ schemaVersion: 1, generatedAt: new Date().toISOString(), draft, role, modules: selectedModules }, null, 2),
      'application/json;charset=utf-8',
    )
  }

  const copyGuide = async () => {
    await navigator.clipboard.writeText(facilitatorGuide)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="page studio-page">
      <section className="page-hero page-hero--studio">
        <div><div className="eyebrow"><Layers3 size={16} /> LESSON KIT BUILDER</div><h1>Build for the group and time you have.</h1><p>Choose an audience, time, and format. The builder only uses lessons written in this project.</p></div>
        <div className="studio-hero-note"><Sparkles size={20} /><div><strong>One library, many paths</strong><span>Choose the details. Preview the session. Save a kit you can adapt.</span></div></div>
      </section>

      <div className="studio-layout">
        <aside className="studio-controls" aria-label="Curriculum controls">
          <div className="studio-controls__heading"><span>BUILD SETTINGS</span><button type="button" onClick={() => updateStudioDraft({ title: 'Better AI decisions starter', goal: 'Help learners make one safer, more useful decision with AI this week.', role: 'general', minutes: 30, format: 'self-paced', moduleIds: suggestModules('general', 30) })}><RotateCcw size={15} /> Reset</button></div>

          <label className="studio-field"><span>Kit title</span><input value={draft.title} onChange={(event) => patchDraft({ title: event.target.value })} /></label>
          <label className="studio-field"><span>Learning goal</span><textarea rows={3} value={draft.goal} onChange={(event) => patchDraft({ goal: event.target.value })} /></label>

          <fieldset className="studio-fieldset"><legend>Audience</legend><div className="studio-role-grid">{roles.map((item) => <label className={draft.role === item.id ? 'selected' : ''} key={item.id}><input type="radio" name="studio-role" checked={draft.role === item.id} onChange={() => patchDraft({ role: item.id, moduleIds: suggestModules(item.id, draft.minutes) })} /><span style={{ background: item.color }}><RoleIcon role={item.id} size={17} /></span>{item.shortLabel}</label>)}</div></fieldset>

          <fieldset className="studio-fieldset"><legend>Time budget</legend><div className="segmented-control">{([15, 30, 45, 60] as const).map((minutes) => <label className={draft.minutes === minutes ? 'selected' : ''} key={minutes}><input type="radio" name="minutes" checked={draft.minutes === minutes} onChange={() => patchDraft({ minutes, moduleIds: suggestModules(draft.role, minutes) })} />{minutes}m</label>)}</div></fieldset>

          <fieldset className="studio-fieldset"><legend>Format</legend><div className="format-options">{formats.map((format) => <label className={draft.format === format.id ? 'selected' : ''} key={format.id}><input type="radio" name="format" checked={draft.format === format.id} onChange={() => patchDraft({ format: format.id })} /><span><strong>{format.label}</strong><small>{format.description}</small></span>{draft.format === format.id && <Check size={17} />}</label>)}</div></fieldset>

          <div className="studio-suggest"><button className="button button--paper" type="button" onClick={handleSuggest}><Sparkles size={16} /> Suggest lessons again</button><span>Uses your chosen audience and time limit.</span></div>
        </aside>

        <section className="studio-preview" aria-label="Learning kit preview">
          <div className="studio-preview__top"><div><span>KIT PREVIEW</span><strong>{selectedModules.length} lessons · {totalMinutes} minutes</strong></div><div><button type="button" onClick={copyGuide}><Clipboard size={16} /> {copied ? 'Copied' : 'Copy guide'}</button><button type="button" onClick={exportJson}><FileJson size={16} /> Data file</button><button type="button" onClick={exportMarkdown}><Download size={16} /> Text guide</button></div></div>

          <section className="kit-cover" style={{ '--role-color': role.color } as React.CSSProperties}>
            <span className="kit-cover__role"><RoleIcon role={role.id} /> {role.label}</span>
            <div><span>BRIEF &amp; VERIFY · OPEN LEARNING KIT</span><h2>{draft.title || 'Untitled learning kit'}</h2><p>{draft.goal || 'Add a learning goal in the controls.'}</p></div>
            <dl><div><dt>Format</dt><dd>{formats.find((item) => item.id === draft.format)?.label}</dd></div><div><dt>Run time</dt><dd>{totalMinutes} min</dd></div><div><dt>License</dt><dd>CC BY 4.0</dd></div></dl>
          </section>

          <section className="module-picker">
            <div className="module-picker__heading"><div><span>SESSION PLAN</span><h2>Choose the lessons</h2></div><p>{totalMinutes > draft.minutes ? `${totalMinutes - draft.minutes} minutes over your target` : `${draft.minutes - totalMinutes} minutes available`}</p></div>
            <div className="module-picker__list">
              {modules.map((module) => {
                const selected = draft.moduleIds.includes(module.id)
                const roleExample = module.roleExamples[draft.role] ?? module.roleExamples.general
                return <label className={`module-picker-item ${selected ? 'selected' : ''}`} key={module.id}><input type="checkbox" checked={selected} onChange={() => toggleModule(module.id)} /><span className="module-picker-item__check">{selected && <Check size={15} />}</span><span className="module-picker-item__number">{module.number}</span><span className="module-picker-item__copy"><strong>{module.title}</strong><small>{roleExample?.situation}</small></span><span>{module.minutes}m</span></label>
              })}
            </div>
          </section>

          <section className="kit-export-note"><div><strong>Ready to share.</strong><span>The guide includes goals, key ideas, examples, teaching notes, and license details.</span></div><button className="button button--ink" type="button" disabled={!selectedModules.length} onClick={exportMarkdown}>Save teaching guide <ArrowRight size={17} /></button></section>
        </section>
      </div>
    </div>
  )
}
