// lib/global.d.ts

import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined; // Khai báo prisma như một thuộc tính của globalThis
}

export {}; // Cần phải có để TypeScript hiểu đây là một khai báo toàn cục
