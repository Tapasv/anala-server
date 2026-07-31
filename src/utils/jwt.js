import jwt from "jsonwebtoken";

export function generateAccessToken(user) {
    const AccessToken = jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
        }
    )

    return AccessToken
}

export function generateRefreshToken(user) {
    const RefreshToken = jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        }
    )

    return RefreshToken
}

export function verifyAccessToken(token) {
    return jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
    )
}

export function verifyRefreshToken(token) {
    return jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET
    )
}