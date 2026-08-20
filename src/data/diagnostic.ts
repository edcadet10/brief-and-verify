import type { DiagnosticQuestion } from '../types'

export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: 'd-understand',
    competency: 'understand',
    context:
      'A writing assistant reviews seven interview notes and reports, “Most residents prefer weekend service.” Only three notes clearly say that.',
    prompt: 'What is the most useful interpretation?',
    options: [
      {
        id: 'u-a',
        label: 'The response is a plausible synthesis, not a measured fact; trace it back to the notes.',
        rationale:
          'Right. Language models produce likely continuations and summaries. A confident sentence is not evidence that a count was performed correctly.',
        score: 2,
      },
      {
        id: 'u-b',
        label: 'The system probably found information hidden between the lines.',
        rationale:
          'Inference can be useful, but it cannot turn ambiguous notes into a defensible count without an explicit method and review.',
        score: 0,
      },
      {
        id: 'u-c',
        label: 'The answer is safe to use because it sounds specific.',
        rationale:
          'Specific wording can increase perceived confidence without increasing accuracy.',
        score: 0,
      },
    ],
  },
  {
    id: 'd-explore',
    competency: 'explore',
    context:
      'A local program receives 200 applications. Staff want to reduce sorting time without handing final eligibility decisions to software.',
    prompt: 'Where is AI most appropriately placed?',
    options: [
      {
        id: 'e-a',
        label: 'Let it approve straightforward cases and send only uncertain ones to staff.',
        rationale:
          'That still delegates consequential decisions and may hide systematic errors among “straightforward” cases.',
        score: 0,
      },
      {
        id: 'e-b',
        label: 'Use it to organize documents against a human-defined checklist, then require staff review.',
        rationale:
          'Right. This narrows the task, preserves decision authority, and makes review criteria visible.',
        score: 2,
      },
      {
        id: 'e-c',
        label: 'Avoid all automation because the decision is important.',
        rationale:
          'High stakes call for stronger controls, not necessarily zero assistance. Low-risk preparation can still help.',
        score: 1,
      },
    ],
  },
  {
    id: 'd-brief',
    competency: 'brief',
    context:
      'You need a one-page announcement explaining a schedule change to families who speak a range of languages and may read on a phone.',
    prompt: 'Which instruction gives the strongest starting point?',
    options: [
      {
        id: 'b-a',
        label: '“Write a friendly schedule announcement.”',
        rationale:
          'It gives tone, but leaves the facts, audience needs, constraints, and success criteria unstated.',
        score: 0,
      },
      {
        id: 'b-b',
        label: '“Act as a world-class communications expert and make this perfect.”',
        rationale:
          'A flattering role and vague quality claim do not supply the missing facts or boundaries.',
        score: 0,
      },
      {
        id: 'b-c',
        label:
          'Provide the approved facts, audience, reading level, mobile format, translation plan, and a rule not to invent missing details.',
        rationale:
          'Right. A useful brief makes the job, evidence, constraints, and review standard explicit.',
        score: 2,
      },
    ],
  },
  {
    id: 'd-verify',
    competency: 'verify',
    context:
      'A draft vendor memo includes a precise statistic that would materially strengthen your recommendation, but it provides no source.',
    prompt: 'What should happen first?',
    options: [
      {
        id: 'v-a',
        label: 'Ask the same system whether the statistic is correct.',
        rationale:
          'The same generation process may repeat or reinforce the unsupported claim. Verification needs independent evidence.',
        score: 0,
      },
      {
        id: 'v-b',
        label: 'Locate the original, current source and check that its population and definition match the memo.',
        rationale:
          'Right. A citation is only useful when it exists, supports the exact claim, and fits the context.',
        score: 2,
      },
      {
        id: 'v-c',
        label: 'Round the number so it looks less precise.',
        rationale:
          'Changing presentation does not resolve the missing evidence.',
        score: 0,
      },
    ],
  },
  {
    id: 'd-protect',
    competency: 'protect',
    context:
      'You want help rewriting a sensitive case note. The public tool’s data terms and your organization’s policy are unclear.',
    prompt: 'What is the safest useful next step?',
    options: [
      {
        id: 'p-a',
        label: 'Paste the note, then delete the conversation afterward.',
        rationale:
          'Deletion from your view may not undo collection or processing. Do not submit sensitive data without authorization.',
        score: 0,
      },
      {
        id: 'p-b',
        label: 'Replace the name but leave dates, location, and unusual details.',
        rationale:
          'Removing one direct identifier may not prevent re-identification.',
        score: 1,
      },
      {
        id: 'p-c',
        label: 'Use an approved environment or a fictionalized template with no identifiable details.',
        rationale:
          'Right. Authorization and data minimization come before convenience.',
        score: 2,
      },
    ],
  },
  {
    id: 'd-decide',
    competency: 'decide',
    context:
      'An AI-assisted policy summary is polished, accurate on spot checks, and ready for a public meeting.',
    prompt: 'Who owns the final decision to publish?',
    options: [
      {
        id: 'j-a',
        label: 'The person or team with the relevant authority, after documenting the review and unresolved limits.',
        rationale:
          'Right. Assistance does not transfer accountability. The authorized human owns the decision and escalation path.',
        score: 2,
      },
      {
        id: 'j-b',
        label: 'The software provider, because its system produced the draft.',
        rationale:
          'Providers have responsibilities, but the deploying organization still owns its use and decision process.',
        score: 0,
      },
      {
        id: 'j-c',
        label: 'No one in particular if several people reviewed it.',
        rationale:
          'Distributed review without a named decision owner creates an accountability gap.',
        score: 0,
      },
    ],
  },
]
