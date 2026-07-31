import prisma from "../lib/prisma.js";

class MessageRepository {

    async createMessage(newMessage) {
        const message = await prisma.message.create({
            data: newMessage
        })

        return message
    }

    async getConversationMessages(conversationId) {
        
        const conversationMessage = await prisma.message.findMany({
            where: {
                conversationId: conversationId
            },
            orderBy: {
                createdAt: "asc"

                // Q. Why ASC for messages but DESC for conversations?

                // A. Messages represent a timeline, so they should be returned in chronological order using createdAt ASC. Conversations are shown in the sidebar based on recent activity, so they should be sorted by updatedAt DESC to keep the most recently active conversation at the top.
            }
        })

        return conversationMessage
    }
}

export default new MessageRepository()