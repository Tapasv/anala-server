import chatService from "../services/chat.service.js";

class ChatController {
    async chat(req, res) {
        try {
            const { prompt, conversationId } = req.body;

            const userId = req.user.id

            const aiResponse = await chatService.chat(
                conversationId,
                prompt,
                userId
            );

            return res.status(200).json({
                success: true,
                message: "Response generated successfully",
                conversationId: aiResponse.conversationId,
                title: aiResponse.title,
                response: aiResponse
            })
        } catch(error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new ChatController()