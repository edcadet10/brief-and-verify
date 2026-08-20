export interface ResourceGuide {
  intro: string
  sections: Array<{ title: string; prompt: string; example?: string }>
  closing: string
}

export const resourceGuides: Record<string, ResourceGuide> = {
  'one-pager-brief-canvas': {
    intro: 'Use this before opening any AI tool. If a detail would change another person’s work, put it in the instructions.',
    sections: [
      { title: '1. Job', prompt: 'What specific result or action should exist at the end? Who is it for?', example: 'Draft a 150-word appointment reminder for first-time visitors.' },
      { title: '2. Context', prompt: 'What local facts, audience needs, definitions, or history cannot be guessed?', example: 'Most readers will see it on a phone; some use screen translation.' },
      { title: '3. Sources', prompt: 'Which supplied sources should be trusted? What may the system not invent?', example: 'Use only the approved schedule and access instructions below.' },
      { title: '4. Boundaries', prompt: 'What is outside scope? What should happen when information is missing or sensitive?', example: 'Do not add eligibility guidance; mark missing information as [CHECK].' },
      { title: '5. Finish line', prompt: 'What format and review standard define “ready for human review”?', example: 'Plain language, short headings, all dates copied exactly, links listed separately.' },
    ],
    closing: 'A brief makes the first draft more useful. It does not remove the need to verify the result.',
  },
  'one-pager-risk-ladder': {
    intro: 'Use stronger checks when an error could cause more harm, is harder to undo, involves private information, or rests on unknowns.',
    sections: [
      { title: 'Level 1 · Exploring', prompt: 'Little chance of harm, easy to undo, and no private information.', example: 'Brainstorming headings. Check: fit and usefulness.' },
      { title: 'Level 2 · Working', prompt: 'Shared with coworkers or used to guide routine work.', example: 'Meeting summary. Check: decisions, owners, dates, and missing points.' },
      { title: 'Level 3 · High impact', prompt: 'Could affect rights, health, money, opportunity, safety, or public trust.', example: 'Eligibility notice. Check: trusted sources, a qualified owner, recorded checks, a way to challenge, and a backup plan.' },
      { title: 'When to move up', prompt: 'Use stronger checks for personal data, unfamiliar subjects, disputed evidence, exact current claims, or people who cannot easily correct an error.' },
    ],
    closing: 'When uncertain between levels, use the stronger review until you can justify lowering it.',
  },
  'exercise-hidden-assumption': {
    intro: 'Use this on a recommendation that sounds convincing. Find the assumptions it depends on and test them.',
    sections: [
      { title: 'Claim', prompt: 'What exactly does the recommendation say will happen?' },
      { title: 'Evidence', prompt: 'Which observation or source directly supports that claim?' },
      { title: 'Assumption', prompt: 'What must be true for this evidence to apply here?' },
      { title: 'Counterexample', prompt: 'What plausible case would make the recommendation fail?' },
      { title: 'Smallest useful test', prompt: 'What quick check could show that the assumption is wrong before you act?' },
    ],
    closing: 'If no result could change the recommendation, it is not being treated as an evidence-based claim.',
  },
  'exercise-decision-boundary': {
    intro: 'Break the work into steps before deciding where AI belongs. One useful feature does not need to take over the whole process.',
    sections: [
      { title: 'Prepare', prompt: 'Which gathering, formatting, extraction, or drafting work may be assisted?' },
      { title: 'Recommend', prompt: 'Where may the system suggest or rank—and what evidence must accompany that suggestion?' },
      { title: 'Decide', prompt: 'Which person or role can make the final decision when it may seriously affect someone?' },
      { title: 'Challenge', prompt: 'How can an affected person question, correct, or appeal the result?' },
      { title: 'Backup', prompt: 'What happens when the system is unavailable or not right for the task?' },
    ],
    closing: 'Draw the boundary in writing. “A human is involved” is not enough.',
  },
  'one-pager-data-pause': {
    intro: 'Pause before submitting information. A useful result does not justify unauthorized exposure.',
    sections: [
      { title: 'Permission', prompt: 'Is this tool approved for this purpose and data type? Did the relevant people consent where required?' },
      { title: 'Sensitivity', prompt: 'Does the material concern identity, health, education, employment, finance, location, credentials, or confidential operations?' },
      { title: 'Share less', prompt: 'Can you use a made-up example, template, grouped totals, or a shorter excerpt?' },
      { title: 'What happens to the data', prompt: 'Who can see it? Can it be saved, reused, downloaded, or deleted?' },
      { title: 'Keep people in control', prompt: 'Could this use affect a person? Can they understand it, correct errors, and reach a human?' },
    ],
    closing: 'If permission or the rules are unclear, stop and use a safer example or an approved route.',
  },
  'exercise-seven-day-test': {
    intro: 'Move from course performance to a small real-world test. Choose a reversible task and decide what evidence would count before you begin.',
    sections: [
      { title: 'Task', prompt: 'What small, low-risk task will you try once this week?' },
      { title: 'Safeguard', prompt: 'What will you not delegate, disclose, or publish without review?' },
      { title: 'Success signal', prompt: 'What observable result would make this genuinely useful—quality, time, clarity, or fewer corrections?' },
      { title: 'Review date', prompt: 'When will you compare the result with your normal process?' },
      { title: 'Reflection', prompt: 'What helped, what failed, what changed in your behavior, and what will you do next?' },
    ],
    closing: 'Your own report is not complete proof, but it tells us more about real use than a completion badge.',
  },
}
