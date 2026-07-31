import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Railway Working");
});

export default app;