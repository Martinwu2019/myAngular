import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
// Export the AuthService class
export class AuthService {
  // Create a BehaviorSubject to store the logged in status
  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  // Create an observable to emit the logged in status
  authStatus = this.loggedIn.asObservable();

  // Method to change the logged in status
  changeAuthStatus(value: boolean){
    // Emit the new logged in status
    this.loggedIn.next(value);
  }
  // Constructor to inject the TokenService
  constructor(private token: TokenService) { }
}
