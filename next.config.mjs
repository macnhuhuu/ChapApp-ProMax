// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "uploadthing.com",
            "utfs.io" // Thêm các tên miền khác nếu cần
        ],
    },
};

export default nextConfig; // Nếu cấu hình theo ESM, hoặc dùng module.exports nếu cần dạng CommonJS
