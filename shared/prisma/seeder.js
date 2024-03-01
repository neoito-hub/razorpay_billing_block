import { PrismaClient } from '@prisma/client'
import addUsers from './seeder/users_seed.js'

const prisma = new PrismaClient()

async function main() {
  // await createCurrency(prisma)
  await addUsers(prisma)
}

main()
  .catch((e) => {
    console.log('e', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
