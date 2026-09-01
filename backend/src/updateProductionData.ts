import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Updating production data...')

  // Update testimonials
  console.log('Updating testimonials...')
  
  // Update testimonial 1: Joseph Suah
  await prisma.testimonial.updateMany({
    where: { authorName: 'Sarah K.' },
    data: {
      authorName: 'Joseph Suah',
      authorRole: 'Software Engineer',
      company: '',
    }
  })

  // Update testimonial 2: Jenkins Wleh
  await prisma.testimonial.updateMany({
    where: { authorName: 'Marcus R.' },
    data: {
      authorName: 'Jenkins Wleh',
      authorRole: 'Founder',
      company: 'TERRA',
      content: 'The website exceeded our expectations. Clean code, great UX, and they genuinely understood our business goals from day one.',
    }
  })

  // Update testimonial 3: LENA MOONE
  await prisma.testimonial.updateMany({
    where: { authorName: 'Lena M.' },
    data: {
      authorName: 'LENA MOONE',
    }
  })

  console.log('Testimonials updated')

  // Update blog post date
  console.log('Updating blog post...')
  await prisma.blogPost.updateMany({
    where: { slug: 'prompt-engineering-masterclass-april-2026' },
    data: {
      slug: 'prompt-engineering-masterclass-november-2026',
      title: 'Burtech Academy: Prompt Engineering Masterclass — November 18, 2026',
      content: '<p>Burtech Academy is hosting a free one-day online masterclass on Prompt Engineering on <strong>November 18, 2026</strong> via Google Meet.</p><h2>What You Will Learn</h2><ul><li>How large language models work</li><li>Prompt structure and best practices</li><li>Zero-shot and few-shot prompting</li><li>Chain-of-thought prompting</li><li>Using AI coding agents: Windsurf and Antigravity</li><li>Practical hands-on exercises</li></ul><h2>How to Register</h2><p>Registration is free. Fill in the contact form and we will send you the Google Meet link. <a href="/contact">Register here</a></p>',
      publishedAt: new Date('2026-09-15'),
    }
  })

  console.log('Blog post updated')

  console.log('Production data update complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
