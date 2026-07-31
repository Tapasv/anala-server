import app from "./app.js";
import cors from "cors"
import express from "express"

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://192.168.0.198:5173", 
        "http://10.12.70.65:5173",
        "http://192.168.1.10:5173"
    ],
    credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});