import conversationService from "../services/conversation.service.js";

class ConversationController {

    async createConversation(req, res) {

        try {

            const userId = req.user.id;
            const { title } = req.body;

            const conversation =
                await conversationService.createConversation(
                    userId,
                    title
                );

            return res.status(201).json({
                success: true,
                message: "Conversation created successfully.",
                data: conversation
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

    async getConversation(req, res) {

        try {

            const userId = req.user.id;

            const conversations =
                await conversationService.getUserConversation(
                    userId
                );

            return res.status(200).json({
                success: true,
                data: conversations
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    async getArchivedConversation(req, res) {

        try {

            const userId = req.user.id;

            const conversations =
                await conversationService.getArchivedConversation(
                    userId
                );

            return res.status(200).json({
                success: true,
                data: conversations
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    async updateConversationTitle(req, res) {

        try {

            const { conversationId } = req.params;
            const { title } = req.body;

            const conversation =
                await conversationService.updateConversationTitle(
                    conversationId,
                    title
                );

            return res.status(200).json({
                success: true,
                message: "Conversation title updated successfully.",
                data: conversation
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

    async togglePinConversation(req, res) {

        try {

            const { conversationId } = req.params;

            const conversation =
                await conversationService.togglePinConversation(
                    conversationId
                );

            return res.status(200).json({
                success: true,
                message: conversation.isPinned
                    ? "Conversation pinned successfully."
                    : "Conversation unpinned successfully.",
                data: conversation
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

    async archiveConversation(req, res) {

        try {

            const { conversationId } = req.params;

            const conversation =
                await conversationService.archiveConversation(
                    conversationId
                );

            return res.status(200).json({
                success: true,
                message: "Conversation archived successfully.",
                data: conversation
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

    async restoreConversation(req, res) {

        try {

            const { conversationId } = req.params;

            const conversation =
                await conversationService.restoreConversation(
                    conversationId
                );

            return res.status(200).json({
                success: true,
                message: "Conversation restored successfully.",
                data: conversation
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

    async deleteConversation(req, res) {

        try {

            const { conversationId } = req.params;
            const userId = req.user.id;

            await conversationService.deleteConversation(
                conversationId,
                userId
            );

            return res.status(200).json({
                success: true,
                message: "Conversation deleted successfully."
            });

        } catch (error) {

            return res.status(400).json({
                success: false,
                message: error.message
            });

        }

    }

}

export default new ConversationController();