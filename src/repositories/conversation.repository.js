import prisma from "../lib/prisma.js";

class ConversationRepo {
    async createConversation(newConvo) {

        const convo = await prisma.conversation.create({
            data: newConvo
        })

        return convo;
    }
    async findConversationById(conversationId, userId) {

        const convo = await prisma.conversation.findFirst({
            where: {
                id: conversationId,
                userId: userId
            }
        })

        return convo
    }
    async getUserConversations(userId) {

        return prisma.conversation.findMany({

            where: {
                userId,
                isArchived: false
            },

            orderBy: [

                {
                    isPinned: "desc"
                },

                {
                    updatedAt: "desc"
                }

            ]

        });

    }
    async deleteConversation(conversationId, userId) {

        const convo = await prisma.conversation.findFirst({
            where: {
                id: conversationId,
                userId: userId
            }
        })

        if (!convo) {
            return null;
        }

        const deletedConvo = await prisma.conversation.delete({
            where: {
                id: conversationId
            }
        });

        return deletedConvo
    }

    async updateConversationTitle(conversationId, title) {
        const conversation = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                title: title
            }
        })

        return conversation
    }

    async updateConversationTitle(conversationId, title) {

        return prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                title
            }
        });

    }

    async togglePinConversation(conversationId) {

        const conversation =
            await prisma.conversation.findUnique({
                where: {
                    id: conversationId
                }
            });

        if (!conversation) {
            return null;
        }

        return prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                isPinned: !conversation.isPinned
            }
        });

    }

    async archiveConversation(conversationId) {

        return prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                isArchived: true
            }
        });

    }

    async getArchivedConversations(userId) {

        return prisma.conversation.findMany({

            where: {
                userId,
                isArchived: true
            },

            orderBy: [

                {
                    isPinned: "desc"
                },

                {
                    updatedAt: "desc"
                }

            ]

        });

    }

    async restoreConversation(conversationId) {

        return prisma.conversation.update({

            where: {
                id: conversationId
            },

            data: {
                isArchived: false
            }

        });

    }

    async touchConversation(conversationId) {

        return await prisma.conversation.update({

            where: {
                id: conversationId
            },

            data: {
                updatedAt: new Date()
            }

        });

    }
}

export default new ConversationRepo()