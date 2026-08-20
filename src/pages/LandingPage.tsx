import {
  ArrowRight,
  BookOpenCheck,
  Check,
  CircleAlert,
  Eye,
  Gauge,
  Layers3,
  LockKeyhole,
  MoveUpRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Brand } from '../components/Brand'
import { RoleIcon } from '../components/RoleIcon'
import { useLearner } from '../context/LearnerContext'
import { roles } from '../data/roles'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function LandingPage() {
  const { state } = useLearner()
  useDocumentTitle('Better decisions with AI')
  const primaryLink = state.onboarded ? '/home' : '/check-in'
  const primaryLabel = state.onboarded ? 'Continue your path' : 'Take the 3-minute check-in'

  return (
    <div className="landing-page">
      <a className="skip-link" href="#landing-main">Skip to main content</a>
      <header className="landing-header">
        <Brand light />
        <nav aria-label="Landing navigation">
          <a href="#method">How it works</a>
          <a href="#audiences">Learning paths</a>
          <Link to="/about">Method &amp; sources</Link>
        </nav>
        <Link className="button button--small button--paper" to={primaryLink}>
          {state.onboarded ? 'Continue' : 'Start free'}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </header>

      <main id="landing-main">
        <div className="hero-wrap">
          <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow eyebrow--lime">
              <Sparkles size={15} aria-hidden="true" />
              Practical AI learning for real life
            </div>
            <h1>
              Use AI.
              <span>Keep your judgment.</span>
            </h1>
            <p className="hero-copy__lede">
              Learn to define the job, question the output, protect people, and own the final call—whatever system you use.
            </p>
            <div className="hero-actions">
              <Link className="button button--coral button--large" to={primaryLink}>
                {primaryLabel}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="text-link text-link--light" to="/practice">
                Preview a practice scenario
                <MoveUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <ul className="trust-list" aria-label="Product promises">
              <li><Check size={16} aria-hidden="true" /> No account</li>
              <li><Check size={16} aria-hidden="true" /> No paid service</li>
              <li><Check size={16} aria-hidden="true" /> Progress stays on your device</li>
            </ul>
          </div>

          <div className="hero-practice" aria-label="Example verification activity">
            <div className="practice-window">
              <div className="practice-window__topbar">
                <div className="window-dots" aria-hidden="true"><span /><span /><span /></div>
                <span>Practice lab · 02 of 03</span>
                <span className="live-pill"><span /> Ready</span>
              </div>
              <div className="practice-window__body">
                <div className="practice-stage-label">
                  <Eye size={17} aria-hidden="true" />
                  VERIFY
                </div>
                <p className="practice-prompt">A polished draft makes an exact claim with no source. What do you check first?</p>
                <div className="artifact-card">
                  <div className="artifact-card__label">DRAFT EXCERPT</div>
                  <p>“Most people saved 6 hours every week after using the new process.”</p>
                  <div className="artifact-flags">
                    <span><CircleAlert size={14} /> Source?</span>
                    <span><CircleAlert size={14} /> Who took part?</span>
                    <span><CircleAlert size={14} /> Compared with what?</span>
                  </div>
                </div>
                <div className="choice-preview choice-preview--muted">
                  <span className="choice-letter">A</span>
                  Ask the same system if the number is correct
                </div>
                <div className="choice-preview choice-preview--selected">
                  <span className="choice-letter">B</span>
                  Check the claim against a current, separate source
                  <Check size={17} aria-hidden="true" />
                </div>
                <div className="micro-feedback">
                  <ShieldCheck size={20} aria-hidden="true" />
                  <p><strong>Good call.</strong> Check important claims against a separate, trusted source.</p>
                </div>
              </div>
            </div>
            <div className="floating-note floating-note--one" aria-hidden="true">Proof matters more than polish</div>
            <div className="floating-note floating-note--two" aria-hidden="true">Human owns the call</div>
          </div>
          </section>
        </div>

        <section className="signal-strip" aria-label="Learning approach">
          <p>Skills that keep working</p>
          <span />
          <p>Built from public guidance</p>
          <span />
          <p>Made for real use, not just completion</p>
        </section>

        <section id="method" className="landing-section method-section">
          <div className="section-kicker">ONE LOOP. MANY SITUATIONS.</div>
          <div className="split-heading">
            <h2>Not another list of prompt tricks.</h2>
            <p>Practice a repeatable way to work: make the job clear, test what matters, then take responsibility for what happens next.</p>
          </div>
          <div className="method-grid">
            <article className="method-card method-card--lime">
              <div className="method-card__number">01</div>
              <Layers3 aria-hidden="true" />
              <h3>Brief</h3>
              <p>Define the job, background, sources, limits, and finish line.</p>
              <span>Good inputs start with clear thinking.</span>
            </article>
            <article className="method-card method-card--coral">
              <div className="method-card__number">02</div>
              <BookOpenCheck aria-hidden="true" />
              <h3>Verify</h3>
              <p>Check claims and assumptions, notice what is missing, and use stronger checks when an error could cause more harm.</p>
              <span>A smooth answer is not proof.</span>
            </article>
            <article className="method-card method-card--violet">
              <div className="method-card__number">03</div>
              <Gauge aria-hidden="true" />
              <h3>Decide</h3>
              <p>Keep decisions with people, record the checks, and plan how to correct errors.</p>
              <span>You still own the decision.</span>
            </article>
          </div>
        </section>

        <section id="audiences" className="landing-section audience-section">
          <div className="audience-section__intro">
            <div className="section-kicker">THE SAME SKILLS, IN YOUR WORLD</div>
            <h2>The situation changes what could go wrong.</h2>
            <p>The same core lessons use examples, practice cases, and safety checks that fit your work.</p>
          </div>
          <div className="audience-grid">
            {roles.map((role) => (
              <article className="audience-card" key={role.id} style={{ '--role-color': role.color } as React.CSSProperties}>
                <div className="audience-card__icon"><RoleIcon role={role.id} /></div>
                <h3>{role.label}</h3>
                <p>{role.description}</p>
                <span>{role.stakes}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section evidence-section">
          <div className="evidence-panel">
            <div>
              <div className="section-kicker section-kicker--light">MEASURE THE RIGHT THING</div>
              <h2>Completion is a click. Judgment shows up in choices.</h2>
              <p>Track what you understood, the choices you made in practice, how well your confidence matched your results, and one seven-day test at work.</p>
            </div>
            <div className="evidence-metrics" aria-label="Example learning indicators">
              <div><span>84</span><small>Practice choices</small></div>
              <div><span>+22</span><small>Understanding change</small></div>
              <div><span>Good</span><small>Confidence matched results</small></div>
              <p>Illustrative preview—not learner data.</p>
            </div>
          </div>
        </section>

        <section className="landing-section final-cta">
          <div className="final-cta__icon"><LockKeyhole aria-hidden="true" /></div>
          <div>
            <div className="section-kicker">FREE · PRIVATE BY DEFAULT · OPENLY LICENSED</div>
            <h2>Start with one honest check.</h2>
            <p>No login, no paid service setup, and no product pitch. Your first path starts from what you can already do.</p>
          </div>
          <Link className="button button--ink button--large" to={primaryLink}>
            {primaryLabel}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </section>
      </main>

      <footer className="landing-footer">
        <Brand light />
        <p>Free practice for making better decisions with AI.</p>
        <div>
          <Link to="/about">Method &amp; sources</Link>
          <a href="https://github.com/edcadet10/brief-and-verify" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </footer>
    </div>
  )
}
