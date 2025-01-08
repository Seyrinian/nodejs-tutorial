import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Suppression de tous les posts
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();

  // Réinitialisation de l'auto-incrémentation
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='User'`;
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Post'`;

  // Création de plusieurs utilisateurs avec createMany
  await prisma.user.createMany({
    data: [
      {
        name: 'John Doe',
      },
      {
        name: 'Jane Smith',
      },
    ],
  });

  // Création de posts pour un utilisateur spécifique avec create
  await prisma.post.create({
    data: {
      title: 'Premier Post de John',
      authorId: 1, // ID de l'utilisateur John Doe
    },
  });

  // Création de plusieurs posts avec createMany
  await prisma.post.createMany({
    data: [
      {
        title: 'Post collectif de John',
        authorId: 1,
      },
      {
        title: 'Deuxième post de Jane',
        authorId: 2,
      },
    ],
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
