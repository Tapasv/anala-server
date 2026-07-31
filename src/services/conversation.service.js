import conversationRepository from "../repositories/conversation.repository.js";

class ConversationService {

    async createConversation(userId, title) {

        const newConversation = {
            title,
            userId
        };

        return await conversationRepository.createConversation(
            newConversation
        );

    }

    async getUserConversation(userId) {

        return await conversationRepository.getUserConversations(
            userId
        );

    }

    async getArchivedConversation(userId) {

        return await conversationRepository.getArchivedConversations(
            userId
        );

    }

    async findConversationbyId(conversationId, userId) {

        return await conversationRepository.findConversationById(
            conversationId,
            userId
        );

    }

    async deleteConversation(conversationId, userId) {

        const conversation =
            await conversationRepository.deleteConversation(
                conversationId,
                userId
            );

        if (!conversation) {

            throw new Error(
                "Conversation not found."
            );

        }

        return conversation;

    }

    async updateConversationTitle(
        conversationId,
        title
    ) {

        return await conversationRepository.updateConversationTitle(
            conversationId,
            title
        );

    }

    async togglePinConversation(
        conversationId
    ) {

        const conversation =
            await conversationRepository.togglePinConversation(
                conversationId
            );

        if (!conversation) {

            throw new Error(
                "Conversation not found."
            );

        }

        return conversation;

    }

    async archiveConversation(
        conversationId
    ) {

        const conversation =
            await conversationRepository.archiveConversation(
                conversationId
            );

        if (!conversation) {

            throw new Error(
                "Conversation not found."
            );

        }

        return conversation;

    }

    async restoreConversation(
        conversationId
    ) {

        const conversation =
            await conversationRepository.restoreConversation(
                conversationId
            );

        if (!conversation) {

            throw new Error(
                "Conversation not found."
            );

        }

        return conversation;

    }

    async touchConversation(conversationId) {

        return await conversationRepository.touchConversation(
            conversationId
        );

    }

}

export default new ConversationService();