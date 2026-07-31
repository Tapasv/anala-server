import bcrypt from "bcrypt";

import userRepository from "../repositories/user.repository.js";

class UserService {

    async getProfile(userId) {

        const profile =
            await userRepository.getProfilebyId(
                userId
            );

        if (!profile) {
            throw new Error("User not found");
        }

        return profile;

    }

    async updateUsername(userId, username) {

        const trimmedUsername =
            username.trim();

        if (!trimmedUsername) {
            throw new Error(
                "Username is required"
            );
        }

        const existingUser =
            await userRepository.findbyUsername(
                trimmedUsername
            );

        if (
            existingUser &&
            existingUser.id !== userId
        ) {
            throw new Error(
                "Username already exists"
            );
        }

        await userRepository.updateUsername(

            userId,

            trimmedUsername

        );

        const updatedProfile =
            await userRepository.getProfilebyId(
                userId
            );

        return updatedProfile;

    }

    async changePassword(
        userId,
        currentPassword,
        newPassword
    ) {

        if (!currentPassword) {

            throw new Error(
                "Current password is required."
            );

        }

        if (!newPassword) {

            throw new Error(
                "New password is required."
            );

        }

        const user =
            await userRepository.findbyId(
                userId
            );

        if (!user) {

            throw new Error(
                "User not found."
            );

        }

        const isPasswordCorrect =
            await bcrypt.compare(

                currentPassword,

                user.password

            );

        if (!isPasswordCorrect) {

            throw new Error(
                "Current password is incorrect."
            );

        }

        const isSamePassword =
            await bcrypt.compare(

                newPassword,

                user.password

            );

        if (isSamePassword) {

            throw new Error(
                "New password cannot be the same as the current password."
            );

        }

        const hashedPassword =
            await bcrypt.hash(

                newPassword,

                10

            );

        await userRepository.updatePassword(

            userId,

            hashedPassword

        );

    }

}

export default new UserService();