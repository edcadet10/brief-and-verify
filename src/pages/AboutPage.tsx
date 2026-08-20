import { ArrowUpRight, Braces, Eye, HeartHandshake, LockKeyhole, Scale, ShieldCheck } from 'lucide-react'
import { researchSources } from '../data/sources'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function AboutPage() {
  useDocumentTitle('Method & sources')

  return (
    <div className="page about-page">
      <section className="page-hero page-hero--about"><div><div className="eyebrow">METHOD &amp; SOURCES</div><h1>Built to show what it can and cannot prove.</h1><p>Brief &amp; Verify is an independent learning project that works with any AI system. Short lessons and realistic practice help you build skills you can use elsewhere.</p></div></section>

      <section className="about-principles">
        <article><Eye /><span>01</span><h2>You can see how your path changes</h2><p>The unfinished skill with the lowest check-in score moves up your path. The app does not guess your personality or overall ability.</p></article>
        <article><Scale /><span>02</span><h2>Claims match what was tested</h2><p>A quiz can show what you understood here. A practice case can show the choices you made. Neither proves lasting skill at work.</p></article>
        <article><HeartHandshake /><span>03</span><h2>People keep control</h2><p>The lessons show who makes the decision, who checks it, and how someone can question or correct it when other people are affected.</p></article>
      </section>

      <section className="about-section">
        <div className="about-section__heading"><span>LEARNING DESIGN</span><h2>The steps behind every lesson</h2></div>
        <div className="learning-loop-diagram" aria-label="Learning sequence: explain, choose, receive feedback, repair, apply, reflect">
          {['Explain', 'Choose', 'Feedback', 'Try again', 'Apply', 'Reflect'].map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></div>)}
        </div>
        <p className="about-section__body">Your first check-in suggests where to start. Lesson checks and practice choices update that order. A wrong answer leads to a short explanation and another chance. This simple rule is deliberate. Research gives stronger support to changing difficulty, offering help, and retrying than to letting software guess everything a learner needs.</p>
      </section>

      <section className="about-section research-section">
        <div className="about-section__heading"><span>HOW RESEARCH SHAPED THE PROJECT</span><h2>Public sources, clearly linked</h2><p>Public sources shaped the skills and safety guidance. The wording, practice cases, and interface are original.</p></div>
        <div className="source-list">
          {researchSources.map((source) => <article key={source.id}><div><span>{source.organization}</span><span>{source.year}</span></div><h3>{source.title}</h3><p>{source.usedFor}</p><a href={source.url} target="_blank" rel="noreferrer">Open source <ArrowUpRight size={15} /></a></article>)}
        </div>
      </section>

      <section className="about-section architecture-section">
        <div className="about-section__heading"><span>HOW THE APP CAN GROW</span><h2>Free now. Ready to grow later.</h2><p>The public version works on its own. Developers can connect optional services without changing the lessons.</p></div>
        <div className="architecture-grid">
          <article><Braces /><h3>Practice feedback</h3><p>The app uses feedback written in advance. A future optional service can follow the same three steps: start, respond, and continue.</p><code>Start · respond · continue</code></article>
          <article><LockKeyhole /><h3>Where progress is saved</h3><p>Progress stays in this browser. An optional account service could save it elsewhere only with the learner’s permission.</p><code>Read · save · clear</code></article>
          <article><ShieldCheck /><h3>Learning records</h3><p>Activity records stay in this browser. Any group study would need clear consent, a research plan, data deletion rules, and a secure service.</p><code>Record · review</code></article>
        </div>
      </section>

      <section className="about-section privacy-section" id="privacy">
        <div className="about-section__heading"><span>PRIVACY</span><h2>No account. No tracking script. No call to an AI service.</h2></div>
        <div className="privacy-grid"><p>Your progress, saved resources, lesson-kit drafts, and workplace reviews stay in your browser. Clearing site data removes them. Use the Progress page to save a backup.</p><p>The website host may record standard request details, such as your internet address, for security and operations. This app adds no tracking, advertising, cookies, or outside fonts.</p></div>
      </section>

      <section className="license-panel"><div><span>OPEN BY DESIGN</span><h2>Adapt it. Teach it. Improve it.</h2><p>Application code uses the MIT License. Original learning content uses the Creative Commons Attribution 4.0 License.</p></div><a className="button button--paper" href="https://github.com/edcadet10/brief-and-verify" target="_blank" rel="noreferrer">View source <ArrowUpRight size={17} /></a></section>
    </div>
  )
}
