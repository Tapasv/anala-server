import messageService from "../services/message.service.js";

class messageController {
    async getConversationMessages(req, res) {
        try {

            const { conversationId } = req.params;

            const messages = await messageService.getConversationMessages(
                conversationId
            );

            return res.status(200).json({
                success: true,
                data: messages
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }
    }
}

export default new messageController()