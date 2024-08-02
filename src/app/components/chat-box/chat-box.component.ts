import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent implements OnInit {
  @ViewChild('chatContent') chatContent!: ElementRef; 
  messages: { text: string, isUser: boolean }[] = [];
  welcomeMessage: string | null = null;
  newMessage: string = '';
  showChatBox: boolean = false;
  model: string = 'gpt-3.5-turbo';

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.loadChatHistory();
  }

  onModelChange(event: Event): void {
    this.model = (event.target as HTMLSelectElement).value;
  }

  private scrollToBottom(): void {
    if (this.chatContent && this.chatContent.nativeElement) {
      this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
    }
  }

  ngAfterViewChecked(): void {
    if (this.showChatBox) {
      this.scrollToBottom();
    }
  }

  toggleChatBox() {
    this.showChatBox = !this.showChatBox;
    if (this.showChatBox) {
      this.loadChatHistory();
      this.scrollToBottom();
    }
  }

  sendMessage() {
    const messagePayload = {
      message: this.newMessage,
      model: this.model
    };

    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, isUser: true });
      this.chatService.sendMessage(messagePayload).subscribe({
        next: response => {
          if (response && response.choices && response.choices.length > 0) {
            const aiReply = response.choices[0].message.content;
            this.messages.push({ text: aiReply, isUser: false });
            this.scrollToBottom(); // Scroll to bottom after receiving AI response
          } else {
            console.error('Unexpected response structure:', response);
          }
        },
        error: error => {
          console.error('Error from backend:', error);
        }
      });
      this.newMessage = '';
    }
  }

  loadChatHistory() {
    this.chatService.getChatHistory().subscribe({
      next: response => {
        this.messages = []; // Clear current messages
        if (response.welcomeMessage) {
          this.messages.push({ text: response.welcomeMessage, isUser: false });
        }

        if (response.history) {
          this.messages = this.messages.concat(
            response.history.map((h: { message: any; is_user: any; }) => ({ text: h.message, isUser: h.is_user }))
          );
        }
        this.scrollToBottom(); // Scroll to bottom after loading history
      },
      error: error => {
        console.error('Error loading chat history:', error);
      }
    });
  }

  saveChatHistory() {
    this.chatService.saveChatHistory(this.messages).subscribe({
      next: () => {
        console.log('Chat history saved successfully');
      },
      error: error => {
        console.error('Error saving chat history:', error);
      }
    });
  }
}



// loadChatHistory2() {
//   this.chatService.getChatHistory().subscribe({
//     next: response => {
//       this.messages = []; // Clear current messages
//       if (response.history && response.history.length === 0) {
//         this.welcomeMessage = response.welcomeMessage || "Hi, how may I help you?"; // Default welcome message
//       } else {
//         this.welcomeMessage = null; // Clear the welcome message if there is chat history
//       }

//       if (response.history) {
//         this.messages = response.history.map((h: { message: string; is_user: boolean; }) => ({ text: h.message, isUser: h.is_user }));
//       }

//       this.scrollToBottom(); // Scroll to bottom after loading history
//     },
//     error: error => {
//       console.error('Error loading chat history:', error);
//     }
//   });
// }
