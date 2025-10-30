import { Component, ChangeDetectionStrategy, signal, inject, effect, viewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService, ChatMessage } from '../../services/gemini.service';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-assistant.component.html',
  providers: [GeminiService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiAssistantComponent {
  private geminiService = inject(GeminiService);
  chatHistory = signal<ChatMessage[]>([
    { role: 'model', text: "I'm your disaster safety assistant. How can I help? You can ask about first aid, safety procedures, or what to do in an emergency." }
  ]);
  userInput = signal('');
  isLoading = signal(false);

  chatContainer = viewChild<ElementRef<HTMLDivElement>>('chatContainer');

  constructor() {
    effect(() => {
        if (this.chatHistory() && this.chatContainer()) {
            this.scrollToBottom();
        }
    });
  }

  private scrollToBottom(): void {
    try {
        const container = this.chatContainer()?.nativeElement;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
    } catch (err) { }
  }

  async sendMessage() {
    const prompt = this.userInput().trim();
    if (!prompt || this.isLoading()) return;

    this.chatHistory.update(history => [...history, { role: 'user', text: prompt }]);
    this.userInput.set('');
    this.isLoading.set(true);

    try {
      const response = await this.geminiService.generateContent(prompt);
      this.chatHistory.update(history => [...history, { role: 'model', text: response }]);
    } catch (error) {
      console.error('Error getting response from Gemini:', error);
      const errorMessage = 'Sorry, I encountered an error. Please check your API key or try again later.';
      this.chatHistory.update(history => [...history, { role: 'model', text: errorMessage }]);
    } finally {
      this.isLoading.set(false);
    }
  }
  
  sendQuickAction(prompt: string) {
    this.userInput.set(prompt);
    this.sendMessage();
  }
}
