import userService from "../services/user.service.js";

class UserController {

    async getProfile(req, res) {

        try {

            const profile = await userService.getProfile(
                req.user.id
            );

            return res.status(200).json({
                success: true,
                data: profile
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    async updateUsername(req, res) {

        try {

            const profile =
                await userService.updateUsername(
                    req.user.id,
                    req.body.username
                );

            return res.status(200).json({
                success: true,
                message: "Username updated successfully.",
                data: profile
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    async changePassword(req, res) {

        try {

            await userService.changePassword(
                req.user.id,
                req.body.currentPassword,
                req.body.newPassword
            );

            return res.status(200).json({
                success: true,
                message: "Password updated successfully."
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

}

export default new UserController();