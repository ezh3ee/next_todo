import { PrismaClient } from '@/app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = global as unknown as {
    prisma: PrismaClient
}

// const adapter = new PrismaPg({
//     // connectionString: process.env.DATABASE_URL,
//     connectionString: process.env.POSTGRES_URL,
// })

// const prisma = globalForPrisma.prisma || new PrismaClient({
//     adapter,
// })

console.log('accelerate url is ', process.env.PRISMA_DATABASE_URL)

const prisma = globalForPrisma.prisma || new PrismaClient({accelerateUrl: process.env.PRISMA_DATABASE_URL!});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma