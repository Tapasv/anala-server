import authMiddleware from "../middleware/auth.middleware.js";
import messageController from "../controllers/message.controller.js";
import express from "express"

const router = express.Router()

router.get("/:conversationId",authMiddleware, messageController.getConversationMessages);

export default router