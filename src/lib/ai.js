import Groq from "groq-sdk";

const aiclient = new Groq({
    apiKey: process.env.OPENAI_API_KEY
});

export default aiclient;