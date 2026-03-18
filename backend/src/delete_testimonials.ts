import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const allowedNames = ['Sarah K.', 'Marcus R.', 'Lena M.']
  const res = await prisma.testimonial.deleteMany({
    where: {
      authorName: {
        notIn: allowedNames
      }
    }
  })
  console.log(`Deleted ${res.count} testimonials.`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
