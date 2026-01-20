import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Initialize global stats
  await prisma.globalStats.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      signupCount: 0,
      spotsLeft: 500,
    },
  });

  console.log('✅ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });