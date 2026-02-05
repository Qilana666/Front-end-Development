// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

// async function main() {
//   try {
//     const users = await prisma.user.findMany({
//       select: {
//         id: true,
//         name: true,
//         // 不选择密码字段
//       }
//     });
//     console.log('Users in database:', users);
//   } catch (error) {
//     console.error('Error querying users:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// main();