import type { ResearchSource } from '../types'

export const researchSources: ResearchSource[] = [
  {
    id: 'dol-2026',
    organization: 'U.S. Department of Labor',
    title: 'Artificial Intelligence Literacy Framework',
    year: 2026,
    url: 'https://www.dol.gov/agencies/eta/advisories/ten-07-25',
    usedFor:
      'Five core topics and teaching guidance built around practice, real situations, and different kinds of work.',
  },
  {
    id: 'oecd-2026',
    organization: 'OECD & European Commission',
    title: 'Empowering Learners for the Age of AI',
    year: 2026,
    url: 'https://doi.org/10.1787/65cd27d4-en',
    usedFor:
      'Skills for understanding and questioning AI, using it safely and creatively, and making informed choices.',
  },
  {
    id: 'nist-2024',
    organization: 'National Institute of Standards and Technology',
    title: 'Generative Artificial Intelligence Profile (NIST AI 600-1)',
    year: 2024,
    url: 'https://doi.org/10.6028/NIST.AI.600-1',
    usedFor:
      'Stronger checks for higher-risk work, trustworthy information, privacy, clear records, human review, and backup plans.',
  },
  {
    id: 'unesco-2024',
    organization: 'UNESCO',
    title: 'AI Competency Framework for Students',
    year: 2024,
    url: 'https://unesdoc.unesco.org/ark:/48223/pf0000391105',
    usedFor:
      'Keeping people in control, using AI safely and responsibly, defining problems, and building skills step by step.',
  },
  {
    id: 'adaptive-2024',
    organization: 'Military Psychology',
    title: 'Adaptive training instructional interventions: A meta-analysis',
    year: 2024,
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12413037/',
    usedFor:
      'Using simple rules to adjust difficulty, offer help, and give another try without making broad claims about personalization.',
  },
  {
    id: 'wcag-2024',
    organization: 'World Wide Web Consortium',
    title: 'Web Content Accessibility Guidelines (WCAG) 2.2',
    year: 2024,
    url: 'https://www.w3.org/TR/WCAG22/',
    usedFor:
      'Keyboard use, visible focus, clear page structure, usable target sizes, color contrast, and reduced-motion support.',
  },
]

export const getSource = (sourceId: string) =>
  researchSources.find((source) => source.id === sourceId)
