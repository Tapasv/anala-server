import prisma from "../lib/prisma.js";

class UserRepository {

    async createUser(newUser) {

        const user = await prisma.user.create({
            data: newUser
        });

        return user;

    }

    async findbyEmail(email) {

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        return user;

    }

    async findbyUsername(username) {

        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        return user;

    }

    async findbyId(id) {

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });

        return user;

    }

    async updateRefreshToken(userId, RefreshToken) {

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                refreshToken: RefreshToken
            }
        });

        return user;

    }

    async findByRefreshToken(refreshToken) {

        const user = await prisma.user.findFirst({
            where: {
                refreshToken
            }
        });

        return user;

    }

    async removeRefreshToken(userId) {

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                refreshToken: null
            }
        });

        return user;

    }

    async getProfilebyId(userId) {

        const [
            user,
            conversationCount,
            messageCount
        ] = await Promise.all([

            prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    createdAt: true
                }
            }),

            prisma.conversation.count({
                where: {
                    userId: userId
                }
            }),

            prisma.message.count({
                where: {
                    conversation: {
                        userId: userId
                    }
                }
            })

        ]);

        if (!user) {
            return null;
        }

        return {
            ...user,
            conversationCount,
            messageCount
        };

    }

    async updateUsername(userId, username) {

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                username: username
            }
        });

        return user;

    }

    async updatePassword(userId, password) {

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: password
            }
        });

        return user;

    }

}

export default new UserRepository();