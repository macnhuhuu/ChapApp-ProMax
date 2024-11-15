// lib/db.ts

import { PrismaClient } from '@prisma/client'; // Đảm bảo import PrismaClient đúng cách

// Khởi tạo Prisma Client
export const db = globalThis.prisma || new PrismaClient();

// Gán vào globalThis trong môi trường phát triển (chỉ trong môi trường phát triển)
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}
