import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private aiApiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiUrl = environment.apiUrl;
  // private apiUrl = 'http://20.188.117.53:8080/api';

  constructor(private http: HttpClient) { }

  // send message via backend api
  sendMessage(payload: { message: string; model: string }): Observable<any> {
    // Set the authorization header with the token stored in local storage
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    // Send a post request to the server with the payload and headers
    return this.http.post<any>(`${this.apiUrl}/send-message`, payload, { headers })
      .pipe(
        // Catch any errors that occur during the request and log them to the console
        catchError((error) => {
          console.error('Error sending message:', error);
          // Return an observable that throws an error
          return throwError(() => new Error('Error sending message'));
        })
      );
  }

  // // directly connect to AI api (not via backend)
  // sendMessage(message: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${environment.openaiApiKey}`
  //   });

  //   const body = {
  //     model: 'gpt-3.5-turbo',  // or 'gpt-4' if you have access
  //     messages: [{ role: 'user', content: message }]
  //   };

  //   return this.http.post<any>(this.aiApiUrl, body, { headers });
  // }

  // This function fetches the chat history from the backend
  getChatHistory(): Observable<any> {
    // Set the authorization header with the token stored in local storage
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    // Fetch chat history from backend
    return this.http.get<any>(`${this.apiUrl}/chat-history`, { headers });
  }

  // This function saves the chat history to the backend
  saveChatHistory(messages: { text: string, isUser: boolean }[]): Observable<any> {
    // Set the authorization header with the token stored in local storage
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    // Send a post request to the server with the chat history and the authorization header
    return this.http.post<any>(`${this.apiUrl}/save-chat-history`, { messages }, { headers });
  }
}
