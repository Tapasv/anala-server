import express from "express";

import conversationController from "../controllers/conversation.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    conversationController.createConversation
);

router.get(
    "/",
    authMiddleware,
    conversationController.getConversation
);

router.get(
    "/archive",
    authMiddleware,
    conversationController.getArchivedConversation
);

router.patch(
    "/:conversationId/title",
    authMiddleware,
    conversationController.updateConversationTitle
);

router.patch(
    "/:conversationId/pin",
    authMiddleware,
    conversationController.togglePinConversation
);

router.patch(
    "/:conversationId/archive",
    authMiddleware,
    conversationController.archiveConversation
);

router.patch(
    "/:conversationId/restore",
    authMiddleware,
    conversationController.restoreConversation
);

router.delete(
    "/:conversationId",
    authMiddleware,
    conversationController.deleteConversation
);

export default router;