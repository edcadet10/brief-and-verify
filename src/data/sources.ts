import type { ResearchSource } from '../types'

export const researchSources: ResearchSource[] = [
  {
    id: 'dol-2026',
    organization: 'U.S. Department of Labor',
    title: 'Artificial Intelligence Literacy Framework',
    year: 2026,
    url: 'https://www.dol.gov/agencies/eta/advisories/ten-07-25',
    usedFor:
      'Five foundational content areas and delivery principles emphasizing experiential, contextual, role-adaptable learning.',
  },
  {
    id: 'oecd-2026',
    organization: 'OECD & European Commission',
    title: 'Empowering Learners for the Age of AI',
    year: 2026,
    url: 'https://doi.org/10.1787/65cd27d4-en',
    usedFor:
      'A competency view of AI literacy spanning understanding, critical evaluation, ethical use, creativity, and informed decisions.',
  },
  {
    id: 'nist-2024',
    organization: 'National Institute of Standards and Technology',
    title: 'Generative Artificial Intelligence Profile (NIST AI 600-1)',
    year: 2024,
    url: 'https://doi.org/10.6028/NIST.AI.600-1',
    usedFor:
      'Risk-proportionate review, information integrity, privacy, documentation, human oversight, and fallback planning.',
  },
  {
    id: 'unesco-2024',
    organization: 'UNESCO',
    title: 'AI Competency Framework for Students',
    year: 2024,
    url: 'https://unesdoc.unesco.org/ark:/48223/pf0000391105',
    usedFor:
      'Human agency, ethical responsibility, safe use, problem scoping, and progressive competency development.',
  },
  {
    id: 'adaptive-2024',
    organization: 'Military Psychology',
    title: 'Adaptive training instructional interventions: A meta-analysis',
    year: 2024,
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12413037/',
    usedFor:
      'Conservative rule-based adaptation using difficulty, scaffolding, and remediation rather than opaque personalization claims.',
  },
  {
    id: 'wcag-2024',
    organization: 'World Wide Web Consortium',
    title: 'Web Content Accessibility Guidelines (WCAG) 2.2',
    year: 2024,
    url: 'https://www.w3.org/TR/WCAG22/',
    usedFor:
      'Keyboard operation, visible focus, semantic structure, minimum target size, contrast, and reduced-motion support.',
  },
]

export const getSource = (sourceId: string) =>
  researchSources.find((source) => source.id === sourceId)
