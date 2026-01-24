'use server'
import OpenAI from "openai";

interface Context {
    pageContent: any;
    metadata: any
}

export async function sendToLLM(context: Context[], query: string) {
    const contextForLLM = context.map((context) => context.pageContent)
    
    const client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY!
    });
    const systemPrompt = `you are an intelligent ai assistant which helps user to chat with their documents
        given the context of the documents and the user query. only answer to the query which is within the context.

        context: ${contextForLLM}

        userQuery: ${query}
    `

    const response = await client.chat.completions.create({
        model: "chatgpt-4o-latest",
        messages: [{"role": "system", content: systemPrompt},
            {'role': "user", content: query}
        ]
    })
    const result = response.choices[0].message
    return JSON.stringify(result);
    // logic to send to the llm
}