import { currentUser, redirectToSignIn } from "@clerk/nextjs/server";
import { db } from "./db";

export const initialProfile = async () => {
    try {
        const user = await currentUser();
        if (!user) {
            redirectToSignIn(); // Gọi hàm redirect
            return; // Dừng hàm sau khi chuyển hướng
        }

        const profile = await db.profile.findUnique({
            where: {
                userId: user.id
            }
        });

        if (profile) {
            return profile;
        }

        const newProfile = await db.profile.create({
            data: {
                userId: user.id,
                name: `${user.firstName} ${user.lastName}`,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress
            }
        });

        return newProfile;

    } catch (error) {
        console.error("Error in initialProfile:", error);
        // Có thể trả về giá trị mặc định hoặc throw lỗi
        throw error;
    }
};
