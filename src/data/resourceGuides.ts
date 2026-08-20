export interface ResourceGuide {
  intro: string
  sections: Array<{ title: string; prompt: string; example?: string }>
  closing: string
}

export const resourceGuides: Record<string, ResourceGuide> = {
  'one-pager-brief-canvas': {
    intro: 'Use this before opening any AI tool. If a detail would change a capable collaborator’s work, put it in the brief.',
    sections: [
      { title: '1. Job', prompt: 'What concrete artifact or action should exist at the end? Who is it for?', example: 'Draft a 150-word appointment reminder for first-time visitors.' },
      { title: '2. Context', prompt: 'What local facts, audience needs, definitions, or history cannot be guessed?', example: 'Most readers will see it on a phone; some use screen translation.' },
      { title: '3. Evidence', prompt: 'Which supplied sources are authoritative? What may the system not invent?', example: 'Use only the approved schedule and access instructions below.' },
      { title: '4. Boundaries', prompt: 'What is outside scope? What should happen when information is missing or sensitive?', example: 'Do not add eligibility guidance; mark missing information as [CHECK].' },
      { title: '5. Finish line', prompt: 'What format and review standard define “ready for human review”?', example: 'Plain language, short headings, all dates copied exactly, links listed separately.' },
    ],
    closing: 'A brief makes the first draft more useful. It does not remove the need to verify the result.',
  },
  'one-pager-risk-ladder': {
    intro: 'Review intensity should follow consequence, reversibility, sensitivity, and uncertainty—not document length.',
    sections: [
      { title: 'Level 1 · Exploratory', prompt: 'Low consequence, easy to reverse, no sensitive data.', example: 'Brainstorming headings. Review: fit and usefulness.' },
      { title: 'Level 2 · Working', prompt: 'Shared internally or used to guide routine work.', example: 'Meeting summary. Review: trace decisions, owners, dates, and omissions.' },
      { title: 'Level 3 · Consequential', prompt: 'Affects rights, health, money, opportunity, safety, or public trust.', example: 'Eligibility notice. Review: authoritative sources, qualified owner, documented checks, recourse, fallback.' },
      { title: 'Escalation triggers', prompt: 'Move up a level for personal data, unfamiliar domains, disputed evidence, precise current claims, or people unable to correct an error.' },
    ],
    closing: 'When uncertain between levels, use the stronger review until you can justify lowering it.',
  },
  'exercise-hidden-assumption': {
    intro: 'Use this on a recommendation that feels persuasive. The goal is to make its load-bearing assumptions testable.',
    sections: [
      { title: 'Claim', prompt: 'What exactly does the recommendation say will happen?' },
      { title: 'Evidence', prompt: 'Which observation or source directly supports that claim?' },
      { title: 'Assumption', prompt: 'What must be true for the evidence to transfer to this situation?' },
      { title: 'Counterexample', prompt: 'What plausible case would make the recommendation fail?' },
      { title: 'Cheapest test', prompt: 'What small check could disconfirm the assumption before you act?' },
    ],
    closing: 'If no result could change the recommendation, it is not being treated as an evidence-based claim.',
  },
  'exercise-decision-boundary': {
    intro: 'Break a workflow apart before deciding where AI belongs. Do not let one convenient feature inherit the whole process.',
    sections: [
      { title: 'Prepare', prompt: 'Which gathering, formatting, extraction, or drafting work may be assisted?' },
      { title: 'Recommend', prompt: 'Where may the system suggest or rank—and what evidence must accompany that suggestion?' },
      { title: 'Decide', prompt: 'Which person or role has authority for the consequential action?' },
      { title: 'Challenge', prompt: 'How can an affected person question, correct, or appeal the result?' },
      { title: 'Fallback', prompt: 'What happens when the system is unavailable or inappropriate?' },
    ],
    closing: 'Draw the boundary in writing. “A human is involved” is not enough.',
  },
  'one-pager-data-pause': {
    intro: 'Pause before submitting information. A useful result does not justify unauthorized exposure.',
    sections: [
      { title: 'Permission', prompt: 'Is this tool approved for this purpose and data type? Did the relevant people consent where required?' },
      { title: 'Sensitivity', prompt: 'Does the material concern identity, health, education, employment, finance, location, credentials, or confidential operations?' },
      { title: 'Minimum necessary', prompt: 'Can you use a fictional example, template, aggregate, or smaller excerpt?' },
      { title: 'Lifecycle', prompt: 'Who can access the data? How may it be retained, reused, exported, or deleted?' },
      { title: 'Agency', prompt: 'Could this use affect a person? Can they understand it, correct errors, and reach a human?' },
    ],
    closing: 'If authorization or terms are unclear, stop and use a safer substitute or approved route.',
  },
  'exercise-seven-day-test': {
    intro: 'Move from course performance to a small real-world test. Choose a reversible task and decide what evidence would count before you begin.',
    sections: [
      { title: 'Task', prompt: 'What bounded, low-risk task will you try once this week?' },
      { title: 'Safeguard', prompt: 'What will you not delegate, disclose, or publish without review?' },
      { title: 'Success signal', prompt: 'What observable result would make this genuinely useful—quality, time, clarity, or fewer corrections?' },
      { title: 'Review date', prompt: 'When will you compare the result with your normal process?' },
      { title: 'Reflection', prompt: 'What helped, what failed, what changed in your behavior, and what will you do next?' },
    ],
    closing: 'A self-report is still limited evidence, but it is closer to transfer than a completion badge.',
  },
}
