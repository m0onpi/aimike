import type { NextApiRequest, NextApiResponse } from 'next';
import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const fireworks = createOpenAI({ 
  apiKey: process.env.FIREWORKS_API_KEY!,
  baseURL: 'https://api.fireworks.ai/inference/v1'
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Extract the `messages` from the body of the request
    const { messages } = req.body;

    if (!messages) {
      res.status(400).json({ success: false, error: 'Messages not provided' });
      return;
    }

    // Get a language model
    const model = fireworks.completion('accounts/fireworks/models/llama-v2-70b-chat');

    // Call the language model with the prompt
    const result = await streamText({
      model,
      messages,
      maxTokens: 1000,
      temperature: 0.75,
      topP: 1,
      frequencyPenalty: 1,
    });

    // Respond with the result
    const responseStream = result.toAIStreamResponse();
    const responseData = await responseStream.text();

    res.status(200).json({ success: true, response: responseData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
