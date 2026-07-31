import messageRepository from "../repositories/message.repository.js";

class MessageService {
    async createMessage(conversationId, role, content, model = null) {
        const newMessage = {
            conversationId, role, content, model
        }

        const message = await messageRepository.createMessage(newMessage)

        return message
    }

    async getConversationMessages(conversationId) {

        const message = await messageRepository.getConversationMessages(conversationId)

        return message
    }
}

export default new MessageService()