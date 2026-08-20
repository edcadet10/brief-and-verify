import { ArrowUpRight, Braces, Eye, HeartHandshake, LockKeyhole, Scale, ShieldCheck } from 'lucide-react'
import { researchSources } from '../data/sources'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function AboutPage() {
  useDocumentTitle('Method & sources')

  return (
    <div className="page about-page">
      <section className="page-hero page-hero--about"><div><div className="eyebrow">METHOD &amp; SOURCES</div><h1>Built to make its own limits visible.</h1><p>Brief &amp; Verify is an independent, model-neutral learning project. It teaches durable judgment through short explanations, retrieval, scenarios, and a small transfer test.</p></div></section>

      <section className="about-principles">
        <article><Eye /><span>01</span><h2>Inspectable adaptation</h2><p>Your weakest unfinished competency moves up the path. The rule uses answer scores and completion only—no personality or ability inference.</p></article>
        <article><Scale /><span>02</span><h2>Claims match evidence</h2><p>A quiz can show comprehension here. A scenario can show simulated judgment. Neither proves durable workplace behavior.</p></article>
        <article><HeartHandshake /><span>03</span><h2>Human agency</h2><p>The curriculum keeps decision authority, accountability, correction, and recourse visible—especially when other people bear the impact.</p></article>
      </section>

      <section className="about-section">
        <div className="about-section__heading"><span>LEARNING DESIGN</span><h2>The loop behind every module</h2></div>
        <div className="learning-loop-diagram" aria-label="Learning sequence: explain, choose, receive feedback, repair, apply, reflect">
          {['Explain', 'Choose', 'Feedback', 'Repair', 'Apply', 'Reflect'].map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></div>)}
        </div>
        <p className="about-section__body">The app uses an initial macro-adaptive route, then updates mastery using completed checks and scenario decisions. Incorrect answers receive targeted remediation before completion. This is intentionally conservative: research finds that adaptive training effects vary by intervention, with stronger support for difficulty, scaffolding, and remediation than for indiscriminate personalization.</p>
      </section>

      <section className="about-section research-section">
        <div className="about-section__heading"><span>RESEARCH TRACE</span><h2>Public sources, visible influence</h2><p>Sources inform the competency map and safeguards. The wording, scenarios, framework, and interface are original.</p></div>
        <div className="source-list">
          {researchSources.map((source) => <article key={source.id}><div><span>{source.organization}</span><span>{source.year}</span></div><h3>{source.title}</h3><p>{source.usedFor}</p><a href={source.url} target="_blank" rel="noreferrer">Open source <ArrowUpRight size={15} /></a></article>)}
        </div>
      </section>

      <section className="about-section architecture-section">
        <div className="about-section__heading"><span>ARCHITECTURE</span><h2>Free now. Extensible later.</h2></div>
        <div className="architecture-grid">
          <article><Braces /><h3>Practice provider</h3><p>The built-in provider follows authored branches. A future provider can implement the same start, respond, and next contract.</p><code>LearningAssistantProvider</code></article>
          <article><LockKeyhole /><h3>Storage adapter</h3><p>Progress uses browser storage. A consent-aware account service can replace it without rewriting learning pages.</p><code>StorageAdapter&lt;LearnerState&gt;</code></article>
          <article><ShieldCheck /><h3>Analytics adapter</h3><p>Events remain local. Aggregate research would require explicit consent, a study plan, retention rules, and a server implementation.</p><code>LearningAnalyticsAdapter</code></article>
        </div>
      </section>

      <section className="about-section privacy-section" id="privacy">
        <div className="about-section__heading"><span>PRIVACY</span><h2>No account. No tracking script. No model call.</h2></div>
        <div className="privacy-grid"><p>Learning progress, saved resources, studio drafts, and field reflections are stored in your browser. Clearing site data removes them. Use the export control on the Impact page to create a portable backup.</p><p>The host may record standard request information such as an IP address for security and operations. This application does not add analytics, advertising, cookies, or third-party fonts.</p></div>
      </section>

      <section className="license-panel"><div><span>OPEN BY DESIGN</span><h2>Adapt it. Teach it. Improve it.</h2><p>Application code is licensed under MIT. Original curriculum content is licensed under Creative Commons Attribution 4.0.</p></div><a className="button button--paper" href="https://github.com/edcadet10/brief-and-verify" target="_blank" rel="noreferrer">View source <ArrowUpRight size={17} /></a></section>
    </div>
  )
}
