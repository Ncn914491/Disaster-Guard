import { Injectable } from '@angular/core';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

// Declare process for environment variables
declare const process: any;

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

@Injectable()
export class GeminiService {
  private ai: GoogleGenAI;
  private readonly apiKey = process.env.API_KEY;

  constructor() {
    if (!this.apiKey) {
      console.error('API_KEY environment variable not set.');
      throw new Error('API_KEY environment variable not set.');
    }
    this.ai = new GoogleGenAI({ apiKey: this.apiKey });
  }

  async generateContent(prompt: string): Promise<string> {
    try {
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are DisasterGuard, a helpful AI assistant focused on safety and emergency preparedness. Provide clear, concise, and actionable advice. Use simple formatting like lists if helpful. User's query: "${prompt}"`,
        config: {
            systemInstruction: "You are a disaster safety assistant for civilians. Your answers must be helpful, concise, and easy to understand in a crisis. Prioritize safety and clear instructions. Do not provide medical diagnoses, but you can provide standard first aid procedures (e.g., how to perform CPR, treat a burn).",
            temperature: 0.5,
            topP: 0.95,
        }
      });
      // Use markdown-like formatting for better presentation
      return this.formatResponse(response.text);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return 'I am currently unable to process your request. Please try again later.';
    }
  }

  private formatResponse(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italics
      .replace(/(\n\s*-\s)/g, '<br>- ') // List items
      .replace(/\n/g, '<br>'); // Newlines
  }
}
