import type { RoleProfile } from '../types'

export const roles: RoleProfile[] = [
  {
    id: 'general',
    label: 'Everyday decisions',
    shortLabel: 'Everyday',
    description: 'Research, writing, planning, and choices that show up in daily life.',
    stakes: 'Accuracy, privacy, and knowing when expert help matters.',
    icon: 'sparkles',
    color: '#d7f06e',
  },
  {
    id: 'care',
    label: 'Care & health services',
    shortLabel: 'Care',
    description: 'Patient communication, operations, and administrative support.',
    stakes: 'Sensitive information, safety, consent, and professional accountability.',
    icon: 'heart-pulse',
    color: '#ffb6a3',
  },
  {
    id: 'education',
    label: 'Education',
    shortLabel: 'Education',
    description: 'Planning, feedback, accessibility, and learner support.',
    stakes: 'Student privacy, fairness, learning integrity, and age-appropriate use.',
    icon: 'book-open',
    color: '#b8d8ff',
  },
  {
    id: 'business',
    label: 'Small business',
    shortLabel: 'Business',
    description: 'Customer service, marketing, operations, and decision support.',
    stakes: 'Customer trust, confidential data, factual claims, and brand accountability.',
    icon: 'store',
    color: '#ffc86e',
  },
  {
    id: 'policy',
    label: 'Policy & public service',
    shortLabel: 'Public service',
    description: 'Public comments, policy options, procurement, and public communication.',
    stakes: 'Due process, representativeness, transparency, and public impact.',
    icon: 'landmark',
    color: '#cbc4ff',
  },
  {
    id: 'community',
    label: 'Community leadership',
    shortLabel: 'Community',
    description: 'Outreach, grants, local programs, and multilingual communication.',
    stakes: 'Inclusion, local context, cultural voice, and equitable access.',
    icon: 'users',
    color: '#8cdec5',
  },
]

export const getRole = (roleId: RoleProfile['id']) =>
  roles.find((role) => role.id === roleId) ?? roles[0]
