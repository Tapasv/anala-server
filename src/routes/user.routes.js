import express from "express";

import userController from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
    "/profile",
    authMiddleware,
    userController.getProfile
);

router.patch(
    "/profile",
    authMiddleware,
    userController.updateUsername
);

router.patch(
    "/password",
    authMiddleware,
    userController.changePassword
);

export default router;