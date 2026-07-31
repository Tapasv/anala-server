import { verifyAccessToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Access token is required."
            });
        }

        const token = authHeader.split(" ")[1]

        const decoded = verifyAccessToken(token)

        req.user = decoded;

        // Q. Why do we write req.user = decoded?

        // A.decoded is the user information that we get back after successfully verifying the JWT token. decoded is a local variable inside the middleware, so it cannot be accessed by the controller. By attaching it to req.user, we store the authenticated user's information on the request object, which is shared with all subsequent middleware and controllers during the same request.

        next();
    } catch(error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired access token."
        });
    }
}

export default authMiddleware