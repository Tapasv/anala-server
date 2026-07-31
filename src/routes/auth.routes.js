import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import express from "express";

const router = express.Router();

router.post(
    "/register",
    authController.register
);

router.post(
    "/login",
    authController.login
);

router.post(
    "/refresh-token",
    authController.refreshToken
);

router.get(
    "/me",
    authMiddleware,
    authController.getCurrentUser
);

router.post(
    "/logout",
    authMiddleware,
    authController.logout
);

export default router;