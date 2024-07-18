import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handle(token: any) {
    this.set(token);
    console.log(this.isValid());
  }

  set(token: any) {
    return localStorage.setItem('token', token);
  }

  get() {  // get token
    return localStorage.getItem('token');
  }

  remove() { // remove token
    return localStorage.removeItem('token');
  }

  isValid() {  // check if token is valid
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) { // if the token has a valid payload, 
        // and if the issuer of the token is "http://127.0.0.1:8000/api/login"; return true.
        return (payload.iss === "http://127.0.0.1:8000/api/login") ? true : false; 
      }
    }
    return false;
  }

  payload(token: any) { // get the token payload
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: any) { // decode
    return JSON.parse(atob(payload));
  }

  loggedIn(){
    return this.isValid();
  }
}
