import aiService from "./ai.service.js";
import conversationService from "./conversation.service.js";
import messageService from "./message.service.js";

class ChatService {
    async chat(conversationId, prompt, userId) {
        let conversation;

        if (!conversationId) {
            conversation = await conversationService.createConversation(userId, null)
        } else {
            conversation = await conversationService.findConversationbyId(
                conversationId,
                userId
            )
        }

        if (!conversation) {
            throw new Error("Conversation not found")
        }

        await messageService.createMessage(
            conversation.id,
            "USER",
            prompt
        )

        await conversationService.touchConversation(
            conversation.id
        );

        const messages =
            await messageService.getConversationMessages(
                conversation.id
            );

        const aiResponse = await aiService.generateResponse(messages)

        await messageService.createMessage(
            conversation.id,
            "ASSISTANT",
            aiResponse,
            "llama-3.3-70b-versatile"
        )

        await conversationService.touchConversation(
            conversation.id
        );

        if (!conversation.title) {
            const title = await aiService.generateTitle(aiResponse)

            await conversationService.updateConversationTitle(
                conversation.id,
                title
            )

            conversation.title = title
        }

        return {
            conversationId: conversation.id,
            title: conversation.title,
            response: aiResponse
        }
    }
}

export default new ChatService()