/*
A user clicks the Register button on the frontend. The Controller receives the username, email, and password from the request and passes them to the Service. The Service says, "Let's first check if the email already exists," so it asks the Repository. The Repository goes to the PostgreSQL database through Prisma, fetches the required data, and returns it to the Service. If the email and username don't exist, the Service hashes the password, asks the Repository to save the new user, and the Repository stores it in the database. Finally, the created user is returned from the Repository to the Service, then to the Controller, and the Controller sends a successful response back to the frontend.
*/

import authService from "../services/auth.service.js";
import { sanitizeUser } from "../utils/responseFormatter.js";

class AuthController {

    async register(req, res) {

        try {

            const userData = req.body;

            const user =
                await authService.register(userData);

            const safeUser =
                sanitizeUser(user);

            return res.status(201).json({

                success: true,

                message: "User registered successfully.",

                data: safeUser

            });

        } catch (error) {

            return res.status(400).json({

                success: false,

                message: error.message

            });

        }

    }

    async login(req, res) {

        try {

            const userData = req.body;

            const loginData =
                await authService.login(userData);

            const safeUser =
                sanitizeUser(loginData.user);

            return res.status(200).json({

                success: true,

                message: `Welcome back, ${safeUser.username}!`,

                accessToken: loginData.accessToken,

                refreshToken: loginData.refreshToken,

                user: safeUser

            });

        } catch (error) {

            return res.status(400).json({

                success: false,

                message: error.message

            });

        }

    }

    async refreshToken(req, res) {

        try {

            const { refreshToken } = req.body;

            const data =
                await authService.refreshToken(
                    refreshToken
                );

            return res.status(200).json({

                success: true,

                message: "Access token generated successfully.",

                accessToken: data.accessToken

            });

        } catch (error) {

            return res.status(401).json({

                success: false,

                message: error.message

            });

        }

    }

    async getCurrentUser(req, res) {

        try {

            const user =
                await authService.getCurrentUser(
                    req.user.id
                );

            return res.status(200).json({

                success: true,

                user

            });

        } catch (error) {

            return res.status(404).json({

                success: false,

                message: error.message

            });

        }

    }

    async logout(req, res) {

        try {

            await authService.logout(
                req.user.id
            );

            return res.status(200).json({

                success: true,

                message: "Logged out successfully."

            });

        } catch (error) {

            return res.status(400).json({

                success: false,

                message: error.message

            });

        }

    }

}

export default new AuthController();