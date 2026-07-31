import userRepository from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} from "../utils/jwt.js";

//Q. Why do you verify the Refresh Token and then still check the database?

// A. Suppose we login and after 5mins we logged out but before logging out hacker somehow copied our refresh token but when we log out database removed the refresh token from database but jwt.verify() only check the expiry of token not its authenticity so if we use only jwt.verify() it will accept the request of hacker next day but doing another check within database help us to fully authenticate refresh token.

// Q. "Why don't you generate a new Refresh Token every time?"

// A. "Because the existing Refresh Token is still valid and its purpose is to obtain new Access Tokens. Generating a new Refresh Token on every refresh request would add unnecessary complexity. In our implementation, we keep the same Refresh Token until it expires or the user logs out. More advanced systems may implement Refresh Token Rotation for additional security."


class AuthService {

    async register(userData) {

        const existingUser =
            await userRepository.findbyEmail(
                userData.email
            );

        if (existingUser) {
            throw new Error("User already existed.");
        }

        const existingUsername =
            await userRepository.findbyUsername(
                userData.username
            );

        if (existingUsername) {
            throw new Error("Username already in use.");
        }

        const hashedPassword =
            await bcrypt.hash(
                userData.password,
                10
            );

        const newUser = {
            ...userData,
            password: hashedPassword
        };

        return await userRepository.createUser(
            newUser
        );

    }

    async login(userData) {

        const existingUser =
            await userRepository.findbyEmail(
                userData.email
            );

        if (!existingUser) {
            throw new Error(
                "Invalid Email or Password!"
            );
        }

        const isPasswordCorrect =
            await bcrypt.compare(

                userData.password,

                existingUser.password

            );

        if (!isPasswordCorrect) {
            throw new Error(
                "Invalid Email or Password!"
            );
        }

        const accessToken =
            generateAccessToken(existingUser);

        const refreshToken =
            generateRefreshToken(existingUser);

        await userRepository.updateRefreshToken(

            existingUser.id,

            refreshToken

        );

        return {

            user: existingUser,

            accessToken,

            refreshToken

        };

    }

    async refreshToken(token) {

        if (!token) {

            throw new Error(
                "Refresh token is required."
            );

        }

        const decoded =
            verifyRefreshToken(token);

        const existingUser =
            await userRepository.findByRefreshToken(
                token
            );

        if (!existingUser) {

            throw new Error(
                "Invalid refresh token."
            );

        }

        if (decoded.id !== existingUser.id) {

            throw new Error(
                "Invalid refresh token."
            );

        }

        const accessToken =
            generateAccessToken(existingUser);

        return {

            accessToken

        };

    }

    async getCurrentUser(userId) {

        const user =
            await userRepository.findbyId(
                userId
            );

        if (!user) {

            throw new Error(
                "User not found."
            );

        }

        return {

            id: user.id,

            username: user.username,

            email: user.email,

            createdAt: user.createdAt

        };

    }

    async logout(userId) {

        await userRepository.removeRefreshToken(
            userId
        );

    }

}

export default new AuthService();