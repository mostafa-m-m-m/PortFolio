// Single place to edit personal details and links.
export const profile = {
  name: { en: 'Mostafa Mahmoud', ar: 'مصطفى محمود' },
  email: 'mostafa.mahmoud.mohamed00@gmail.com',
  phone: '011 251 214 24',
  phoneTel: '+201125121424',
  linkedin: 'https://www.linkedin.com/in/mostafa-mahmoud-mohamed-260158209/',
  github: 'https://github.com/mostafa-m-m-m',
  company: { name: 'Vconnct', url: 'https://www.vconnct.me/en/home' },
  // Built from cv/cv.html with `npm run cv`. Set to null to hide the "Download CV" button.
  cvUrl: '/Mostafa-Mahmoud-CV.pdf',
}

export const skills = [
  {
    id: 'core',
    items: ['HTML', 'CSS', 'Sass', 'JavaScript', 'TypeScript', 'DOM and BOM'],
  },
  {
    id: 'frameworks',
    items: ['React', 'Next.js', 'React Router', 'Redux Toolkit', 'React Hook Form', 'Zod', 'Tailwind CSS', 'MUI', 'Bootstrap', 'jQuery'],
  },
  {
    id: 'quality',
    items: ['Vitest', 'Playwright', 'axe-core', 'ESLint', 'Git and GitHub', 'Vite'],
  },
  {
    id: 'other',
    items: ['Supabase', 'TanStack Query', 'Prisma', 'PostgreSQL', 'WordPress', 'Responsive design', 'Accessibility (WCAG)', 'i18n and Arabic RTL'],
  },
]
