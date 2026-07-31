import aiclient from "../lib/ai.js";

class AIService {
    async generateResponse(messages) {

        const formattedMessages = messages.map((message) => ({
            role: message.role.toLowerCase(),
            content: message.content
        }))

        const response = await aiclient.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: formattedMessages
        }) // we use chat here because we are building an app where user will chat with AI, completion means to complete user prompt, create() means to create new chat completions

        return response.choices[0].message.content;
    }

    async generateTitle(response) {
        const titlePrompt = `
Generate a short and meaningful title for this conversation based on your previous response.

Rules:
- Maximum 5 words.
- Return only the title.
- Do not use quotation marks.
- Do not add any explanation.

Response:
${response}
`;

        const titleResponse = await aiclient.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: titlePrompt
                }
            ]
        })

        return titleResponse.choices[0].message.content.trim()
    }
}

export default new AIService()