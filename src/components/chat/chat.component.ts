import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  message = signal('');
  messages = signal([
    { text: 'Is anyone near the town hall? I need assistance.', sender: 'User#1234', time: '10:30 AM', type: 'received' },
    { text: 'I am about 100m away. What is the situation?', sender: 'User#5678', time: '10:31 AM', type: 'received' },
    { text: 'Minor flooding, but the road is blocked. I\'m safe for now.', sender: 'User#1234', time: '10:32 AM', type: 'received' },
    { text: 'Copy that. I will report it.', sender: 'User#5678', time: '10:33 AM', type: 'received' },
  ]);

  sendMessage() {
    if (this.message().trim()) {
      this.messages.update(msgs => [...msgs, { text: this.message(), sender: 'You', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}), type: 'sent' }]);
      this.message.set('');
      // In a real app, this would broadcast the message over the mesh network
    }
  }
}
