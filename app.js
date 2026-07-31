import authroutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';
import chatRoutes from './src/routes/chat.route.js';
import convoRoutes from './src/routes/conversation.routes.js';
import messageRoutes from "./src/routes/message.routes.js";
import express from 'express'
import cors from "cors"

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://192.168.0.198:5173",
        "http://10.12.70.65:5173",
        "http://192.168.1.10:5173",
        "https://anala-client.vercel.app"
    ],
    credentials: true
}));

app.use(express.json())

app.use("/api/auth", authroutes)
app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/conversation", convoRoutes)
app.use("/api/message", messageRoutes);

export default app