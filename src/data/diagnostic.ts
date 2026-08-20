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
        label: 'The response is a possible summary, not a measured fact; trace it back to the notes.',
        rationale:
          'Right. AI systems predict and summarize patterns. A confident sentence does not prove that the system counted correctly.',
        score: 2,
      },
      {
        id: 'u-b',
        label: 'The system probably found information hidden between the lines.',
        rationale:
          'Reading between the lines can be useful, but unclear notes cannot support a count unless you use a clear method and check the work.',
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
          'That still hands serious decisions to software and may hide repeated errors among cases that look simple.',
        score: 0,
      },
      {
        id: 'e-b',
        label: 'Use it to organize documents against a human-defined checklist, then require staff review.',
        rationale:
          'Right. This limits the task, keeps the decision with staff, and makes the checking rules clear.',
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
          'It gives a tone, but leaves out the facts, audience needs, limits, and what a ready draft should include.',
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
          'Right. A useful brief clearly states the job, evidence, limits, and how the result will be checked.',
        score: 2,
      },
    ],
  },
  {
    id: 'd-verify',
    competency: 'verify',
    context:
      'A draft vendor memo includes an exact statistic that would greatly strengthen your recommendation, but it provides no source.',
    prompt: 'What should happen first?',
    options: [
      {
        id: 'v-a',
        label: 'Ask the same system whether the statistic is correct.',
        rationale:
          'The same system may repeat the unsupported claim. Check it against a separate source.',
        score: 0,
      },
      {
        id: 'v-b',
        label: 'Find the original, current source and check that its group and meaning match the memo.',
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
          'Deleting the chat from your view may not stop the service from saving or using the information. Do not submit sensitive data without permission.',
        score: 0,
      },
      {
        id: 'p-b',
        label: 'Replace the name but leave dates, location, and unusual details.',
        rationale:
          'Removing a name may not stop someone from identifying the person through the other details.',
        score: 1,
      },
      {
        id: 'p-c',
        label: 'Use an approved service or a fictional template with no details that could identify someone.',
        rationale:
          'Right. Get permission and share the least information needed, even when sharing more would be easier.',
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
        label: 'The person or team allowed to publish, after recording the review and anything that is still unclear.',
        rationale:
          'Right. Help from software does not move responsibility. An authorized person owns the decision and knows who handles serious problems.',
        score: 2,
      },
      {
        id: 'j-b',
        label: 'The software company, because its system produced the draft.',
        rationale:
          'The software company has responsibilities, but the organization using the system still owns its use and final decision.',
        score: 0,
      },
      {
        id: 'j-c',
        label: 'No one in particular if several people reviewed it.',
        rationale:
          'Several reviewers do not replace one clearly named decision owner.',
        score: 0,
      },
    ],
  },
]
