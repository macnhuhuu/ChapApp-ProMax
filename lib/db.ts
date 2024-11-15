import { PrismaClient } from '@prisma/client'; // Đảm bảo import đúng

declare global {
  var prisma: PrismaClient | undefined; // Khai báo biến toàn cục
}

// Khởi tạo Prisma Client
export const db = globalThis.prisma || new PrismaClient();

// Gán vào globalThis trong môi trường phát triển
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}
