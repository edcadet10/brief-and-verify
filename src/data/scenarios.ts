import type { Scenario } from '../types'

export const scenarios: Scenario[] = [
  {
    id: 'everyday-plan-comparison',
    role: 'general',
    title: 'The too-easy comparison',
    setting: 'You are comparing three service plans for a family member.',
    minutes: 6,
    difficulty: 'Applied',
    summary: 'Keep a convenient comparison from quietly becoming advice.',
    stakes: 'A wrong exclusion or outdated price could shape a costly choice.',
    stages: [
      {
        id: 'frame', label: 'Brief', prompt: 'How do you frame the job?', detail: 'You have current official plan documents and a list of the family member’s priorities.',
        choices: [
          { id: 'g1-b', label: '“Compare these documents against the stated priorities; quote the clause behind each entry and mark missing information.”', feedback: 'Strong. The sources, priorities, and way to handle missing information are clear.', score: 2, principle: 'Set clear limits for the job and its sources.' },
          { id: 'g1-a', label: '“Choose the best plan for this person.”', feedback: 'This hands over a personal decision and does not explain what “best” means.', score: 0, principle: 'Keep the final decision human.' },
          { id: 'g1-c', label: '“Summarize all three plans in a helpful table.”', feedback: 'The format is useful, but the priorities, sources, and missing information are still unclear.', score: 1, principle: 'A format is not a complete set of instructions.' },
        ],
      },
      {
        id: 'verify', label: 'Verify', prompt: 'The table lists a $25 fee for Plan B without a quotation. What do you do?', detail: 'The number would make Plan B appear clearly cheaper.', artifact: 'Plan B · Specialist visit · $25 · “Best value”',
        choices: [
          { id: 'g2-a', label: 'Ask the assistant to double-check.', feedback: 'Asking the same system again is not a separate check.', score: 0, principle: 'Check against a separate, trusted source.' },
          { id: 'g2-b', label: 'Find the fee in the official document and check whether conditions or date limits apply.', feedback: 'Exactly. You checked an important claim against its current source and full context.', score: 2, principle: 'Check claims that could change the decision.' },
          { id: 'g2-c', label: 'Remove “Best value” but keep the fee.', feedback: 'That fixes an interpretation while leaving the unsupported fact.', score: 1, principle: 'Correct the evidence problem first.' },
        ],
      },
      {
        id: 'decide', label: 'Decide', prompt: 'The comparison is now sourced. What is the appropriate finish?', detail: 'One priority—specialist access—still depends on a changing list of covered doctors and clinics.',
        choices: [
          { id: 'g3-a', label: 'Pick the lowest total shown.', feedback: 'A simple total does not settle which doctors are covered or what the person prefers.', score: 0, principle: 'The lowest number is not always the best choice.' },
          { id: 'g3-c', label: 'State that Plan B is probably best.', feedback: '“Probably” does not resolve the missing evidence and may anchor the decision.', score: 1, principle: 'Do not turn uncertainty into soft advice.' },
          { id: 'g3-b', label: 'Present the tradeoffs, confirm the network directly, and let the person decide or seek qualified help.', feedback: 'Strong. The tool helps, but the person keeps control and checks the last open question.', score: 2, principle: 'Keep people in control and seek qualified help when needed.' },
        ],
      },
    ],
  },
  {
    id: 'care-discharge-handout',
    role: 'care',
    title: 'The discharge handout',
    setting: 'A clinic wants to simplify a dense, approved discharge handout.',
    minutes: 7,
    difficulty: 'Applied',
    summary: 'Improve clarity without leaking data or creating new clinical guidance.',
    stakes: 'Patients may act directly on the final instructions.',
    stages: [
      {
        id: 'frame', label: 'Brief', prompt: 'Which input is appropriate?', detail: 'You have an approved generic handout and a real patient’s detailed chart.',
        choices: [
          { id: 'c1-a', label: 'Upload the full chart so the language can be personalized.', feedback: 'The task can be completed without exposing a detailed patient record.', score: 0, principle: 'Use the minimum necessary data.' },
          { id: 'c1-b', label: 'Use only the approved generic handout and define reading level, structure, and “do not add advice.”', feedback: 'Strong. It meets the communication need without unnecessary patient data.', score: 2, principle: 'Minimize data and bind the source.' },
          { id: 'c1-c', label: 'Remove the patient’s name from the chart and upload the rest.', feedback: 'Dates, conditions, locations, and unusual details may still reveal who the person is.', score: 1, principle: 'Removing a name does not make a record anonymous.' },
        ],
      },
      {
        id: 'verify', label: 'Verify', prompt: 'The rewrite says “mild dizziness is normal for 48 hours.” The source does not.', detail: 'The sentence is reassuring and easy to understand.', artifact: 'What to expect · Mild dizziness is normal for 48 hours. Rest and drink water.',
        choices: [
          { id: 'c2-a', label: 'Keep it because it may reduce unnecessary calls.', feedback: 'Saving staff time does not justify made-up health guidance.', score: 0, principle: 'Do not improve convenience at the cost of evidence.' },
          { id: 'c2-c', label: 'Change “normal” to “common.”', feedback: 'A softer unsupported claim remains unsupported.', score: 1, principle: 'Hedging does not create evidence.' },
          { id: 'c2-b', label: 'Remove it and have the authorized clinical reviewer compare every instruction with the source.', feedback: 'Correct. A qualified person checks high-impact content against the source.', score: 2, principle: 'Stronger effects need stronger checks.' },
        ],
      },
      {
        id: 'decide', label: 'Decide', prompt: 'Who approves the handout?', detail: 'Communication staff checked reading level; clinical staff checked instructions.',
        choices: [
          { id: 'c3-b', label: 'A named authorized clinical owner, with communication review recorded and a correction route.', feedback: 'Strong. It is clear who checked the work, who can approve it, and how to correct it.', score: 2, principle: 'Name the owner and the backup plan.' },
          { id: 'c3-a', label: 'The software, because all checks passed.', feedback: 'Software cannot take professional or workplace responsibility.', score: 0, principle: 'Systems do not own the decision.' },
          { id: 'c3-c', label: 'Anyone on the project team.', feedback: 'A broad group with no named decision-maker leaves no one clearly responsible.', score: 1, principle: 'Taking part is not the same as taking responsibility.' },
        ],
      },
    ],
  },
  {
    id: 'education-feedback',
    role: 'education',
    title: 'Feedback without autopilot',
    setting: 'A teacher is exploring assistance with formative writing feedback.',
    minutes: 7,
    difficulty: 'Applied',
    summary: 'Keep feedback aligned to learning instead of automating the teacher’s judgment.',
    stakes: 'Feedback affects learner confidence, opportunity, and trust.',
    stages: [
      {
        id: 'frame', label: 'Brief', prompt: 'Which role should the system play?', detail: 'The teacher has a rubric and anonymized sample paragraphs.',
        choices: [
          { id: 'ed1-a', label: 'Assign final grades and comments.', feedback: 'This gives the system a decision that can seriously affect a student.', score: 0, principle: 'Separate help from decision-making power.' },
          { id: 'ed1-c', label: 'Write encouraging comments only.', feedback: 'Narrower, but generic praise can still replace useful, evidence-based feedback.', score: 1, principle: 'Define the learning purpose.' },
          { id: 'ed1-b', label: 'Identify passages linked to the grading guide and offer two questions for the teacher to review and adapt.', feedback: 'Strong. The teacher can check each suggestion and keeps control of the evaluation and message.', score: 2, principle: 'Use AI to prepare, not decide.' },
        ],
      },
      {
        id: 'verify', label: 'Verify', prompt: 'The draft repeatedly labels informal dialect as “unclear.” What matters most?', detail: 'The rubric assesses argument and evidence, not formal dialect.', artifact: 'Clarity issue: revise informal phrasing throughout.',
        choices: [
          { id: 'ed2-b', label: 'Compare flags with the grading guide, test examples across writing styles, and remove unsupported language judgments.', feedback: 'Correct. The review checks whether the comments fit the task and affect some writing styles unfairly.', score: 2, principle: 'Check whether the rule fits and where errors fall.' },
          { id: 'ed2-a', label: 'Accept it because standard language prepares students for work.', feedback: 'That adds a rule the grading guide did not include and may unfairly penalize some ways of writing.', score: 0, principle: 'Review against the actual standard.' },
          { id: 'ed2-c', label: 'Ask for a friendlier tone.', feedback: 'Tone does not correct the mismatch between the feedback and learning goal.', score: 1, principle: 'A pleasant error remains an error.' },
        ],
      },
      {
        id: 'decide', label: 'Decide', prompt: 'How should feedback reach the student?', detail: 'The teacher has reviewed and edited the useful suggestions.',
        choices: [
          { id: 'ed3-a', label: 'Send it automatically to save time.', feedback: 'Automation removes the final opportunity to align feedback with the learner and context.', score: 0, principle: 'Efficiency does not erase the teaching relationship.' },
          { id: 'ed3-b', label: 'The teacher sends feedback in their own voice and invites the student to question or discuss it.', feedback: 'Strong. The teacher owns the feedback, and the learner has a way to question or correct it.', score: 2, principle: 'Keep the message and conversation human.' },
          { id: 'ed3-c', label: 'Add “AI-assisted” and send without further context.', feedback: 'Disclosure helps, but does not substitute for ownership or a correction path.', score: 1, principle: 'Transparency is necessary, not sufficient.' },
        ],
      },
    ],
  },
  {
    id: 'business-refund-pattern',
    role: 'business',
    title: 'The refund pattern',
    setting: 'A shop owner wants to understand a recent increase in refund requests.',
    minutes: 6,
    difficulty: 'Foundation',
    summary: 'Explore customer data without inventing causes or exposing people.',
    stakes: 'A weak guess about the cause could change policy and treat customers unfairly.',
    stages: [
      {
        id: 'frame', label: 'Brief', prompt: 'What should the analysis ask for?', detail: 'The owner has 80 ticket notes with names, emails, order numbers, and free text.',
        choices: [
          { id: 'bu1-b', label: 'Use an approved copy with only the needed fields. Group the stated reasons using clear rules and quote examples with identifying details removed.', feedback: 'Strong. The information and the limits of the task are both clear.', score: 2, principle: 'Structure the job before analysis.' },
          { id: 'bu1-a', label: 'Upload the export and ask why refunds increased.', feedback: 'The request shares data that is not needed and asks the system to guess a cause from loose notes.', score: 0, principle: 'Share less data and narrow the question.' },
          { id: 'bu1-c', label: 'Remove names but keep all other fields.', feedback: 'Contact details, order numbers, and free text remain unnecessary and potentially identifying.', score: 1, principle: 'Use only fields needed for the task.' },
        ],
      },
      {
        id: 'verify', label: 'Verify', prompt: 'The summary says a new supplier caused the increase.', detail: 'Supplier is not a field in the ticket data, but several complaints mention quality.', artifact: 'Root cause · New supplier quality decline · Confidence: high',
        choices: [
          { id: 'bu2-a', label: 'Use the finding to renegotiate immediately.', feedback: 'The system claimed a cause without the supplier or timing information needed to support it.', score: 0, principle: 'Do not act on information the evidence does not contain.' },
          { id: 'bu2-c', label: 'Lower confidence from high to medium.', feedback: 'A confidence label does not supply the missing evidence.', score: 1, principle: 'Confidence should follow the evidence.' },
          { id: 'bu2-b', label: 'Relabel it as a hypothesis and compare dated refund records with verified supplier and product data.', feedback: 'Correct. The claim becomes testable instead of pretending to be established.', score: 2, principle: 'Separate observation from explanation.' },
        ],
      },
      {
        id: 'decide', label: 'Decide', prompt: 'What is the best near-term action?', detail: 'The verified data shows several causes and no single dominant supplier effect.',
        choices: [
          { id: 'bu3-a', label: 'Tighten the refund policy for everyone.', feedback: 'A broad restriction shifts the cost of uncertainty onto customers.', score: 0, principle: 'Match action to established evidence.' },
          { id: 'bu3-b', label: 'Address verified product issues, keep monitoring with written rules, and let staff use their judgment.', feedback: 'Strong. The response fits the evidence, can be reviewed, and is easy to change.', score: 2, principle: 'Prefer actions that fit the evidence and can be undone.' },
          { id: 'bu3-c', label: 'Wait until the system finds one clear cause.', feedback: 'There may be several causes. Waiting for one simple answer can also lead to a poor decision.', score: 1, principle: 'You can manage what is unknown without pretending it is certain.' },
        ],
      },
    ],
  },
  {
    id: 'policy-public-comments',
    role: 'policy',
    title: 'The public-comment shortcut',
    setting: 'A public office receives 1,200 comments on a proposed rule.',
    minutes: 8,
    difficulty: 'Stretch',
    summary: 'Summarize public comments without treating them as a public vote.',
    stakes: 'The summary may shape a public record and policy recommendation.',
    stages: [
      {
        id: 'frame', label: 'Brief', prompt: 'What is the defensible task?', detail: 'Comments include form letters, technical submissions, personal stories, and short reactions.',
        choices: [
          { id: 'po1-a', label: 'Determine whether the public supports the rule.', feedback: 'People who submit comments may not reflect the whole public, and comments are not a simple vote.', score: 0, principle: 'Do not make a claim about everyone from this group alone.' },
          { id: 'po1-b', label: 'Map arguments and evidence, flag repeated wording, keep less common views, and link themes to source comments.', feedback: 'Strong. The task helps staff review the comments without claiming they represent everyone.', score: 2, principle: 'Keep links to sources and show disagreement.' },
          { id: 'po1-c', label: 'Count comments for and against.', feedback: 'A count may help, but it hides the strength of the evidence, repeated wording, and the purpose of the comment process.', score: 1, principle: 'The number of comments is not the whole story.' },
        ],
      },
      {
        id: 'verify', label: 'Verify', prompt: 'A small theme is absent from the automated summary.', detail: 'It appears in seven detailed comments from people directly affected by implementation.', artifact: 'Theme summary · Top 5 themes cover 94% of comments.',
        choices: [
          { id: 'po2-b', label: 'Review comments from affected groups and report both how often the theme appears and why it matters.', feedback: 'Correct. It keeps a less common view without making it seem more common than it is.', score: 2, principle: 'Check whose views disappear in a summary.' },
          { id: 'po2-a', label: 'Omit it because it appears too few times.', feedback: 'Counting alone can hide the views of people who will be directly affected.', score: 0, principle: 'Who is affected matters alongside how often a view appears.' },
          { id: 'po2-c', label: 'Increase its count so it receives attention.', feedback: 'Importance should be explained, not manufactured through false numbers.', score: 1, principle: 'Do not repair omission with distortion.' },
        ],
      },
      {
        id: 'decide', label: 'Decide', prompt: 'What belongs in the public record?', detail: 'Staff have reviewed a sample, traced themes, and documented limitations.',
        choices: [
          { id: 'po3-a', label: 'Only the polished summary.', feedback: 'Without sources, limits, and an explanation of the method, readers cannot tell how the summary was made.', score: 0, principle: 'People should be able to examine how a public result was made.' },
          { id: 'po3-c', label: 'All raw comments with no explanation.', feedback: 'Source access is valuable, but does not replace an understandable method and responsible handling of sensitive material.', score: 1, principle: 'Transparency needs context and privacy.' },
          { id: 'po3-b', label: 'The summary, method, review process, limitations, source access, and named decision owner.', feedback: 'Strong. People can see the work, question it, and know who is responsible.', score: 2, principle: 'Leave a decision trail.' },
        ],
      },
    ],
  },
  {
    id: 'community-emergency-flyer',
    role: 'community',
    title: 'The translated emergency flyer',
    setting: 'A neighborhood group needs a multilingual heat-emergency flyer today.',
    minutes: 7,
    difficulty: 'Applied',
    summary: 'Move quickly while preserving accuracy, accessibility, and community voice.',
    stakes: 'Incorrect hours or inaccessible language could block urgent help.',
    stages: [
      {
        id: 'frame', label: 'Brief', prompt: 'How should the first draft be produced?', detail: 'Official cooling-center details are available; volunteers know the neighborhood’s preferred languages and channels.',
        choices: [
          { id: 'co1-a', label: 'Ask for a persuasive emergency flyer in six languages.', feedback: 'The request lacks a trusted source, accessibility needs, and a review plan.', score: 0, principle: 'Even urgent work needs clear limits.' },
          { id: 'co1-c', label: 'Translate the English flyer word for word.', feedback: 'Literal translation may preserve terms while missing clarity, cultural fit, or usable action language.', score: 1, principle: 'Equivalence is more than word matching.' },
          { id: 'co1-b', label: 'Provide the official facts, plain-language target, channel constraints, exact no-change fields, and languages for community review.', feedback: 'Strong. The source, constraints, and human review are explicit.', score: 2, principle: 'Design the review into the brief.' },
        ],
      },
      {
        id: 'verify', label: 'Verify', prompt: 'One translation changes “open until 8 p.m.” to “open after 8 p.m.”', detail: 'A fluent volunteer notices the difference during review.', artifact: 'Cooling center · Open after 8 p.m. · Free shuttle',
        choices: [
          { id: 'co2-a', label: 'Publish because the rest is accurate and time is short.', feedback: 'The error changes whether a resident can obtain help.', score: 0, principle: 'Stronger effects need stronger checks.' },
          { id: 'co2-b', label: 'Correct it, have two people check every time, location, eligibility rule, and action phrase, then note when the source was updated.', feedback: 'Correct. The facts that matter most receive a focused check.', score: 2, principle: 'Check the highest-risk facts first.' },
          { id: 'co2-c', label: 'Remove all hours from every version.', feedback: 'Removing essential information avoids one error by making the flyer less useful.', score: 1, principle: 'Correct rather than discard essential facts.' },
        ],
      },
      {
        id: 'decide', label: 'Decide', prompt: 'How do you publish responsibly under time pressure?', detail: 'All critical fields now pass review; one phrase could still be more natural.',
        choices: [
          { id: 'co3-b', label: 'The incident lead approves the checked version, publishes it through accessible channels, and keeps a fast correction route.', feedback: 'Strong. It is clear who approves the flyer, how people can get it, and how errors will be fixed.', score: 2, principle: 'Publish with a named owner and a correction path.' },
          { id: 'co3-a', label: 'Wait for perfect wording in every language.', feedback: 'Delay can also cause harm in a time-sensitive situation.', score: 1, principle: 'Act carefully without waiting for perfect certainty.' },
          { id: 'co3-c', label: 'Let each volunteer publish their own version.', feedback: 'Separate versions can create conflicting facts with no clear person responsible for corrections.', score: 0, principle: 'Coordination matters when errors could cause harm.' },
        ],
      },
    ],
  },
]

export const getScenario = (scenarioId: string) =>
  scenarios.find((scenario) => scenario.id === scenarioId)

export const getScenarioForRole = (role: Scenario['role']) =>
  scenarios.find((scenario) => scenario.role === role) ?? scenarios[0]
