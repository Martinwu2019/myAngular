import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service'
import { TokenService } from '../../services/token.service'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public form = {
    email: null,
    password: null
  }

  constructor(private backend: BackendService, private token: TokenService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void { }

  public error = null;

  submitLogin() {
    // console.log('Submit Login Called');
    // console.log(this.form);
    return this.backend.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse (data: any) {
    console.log(data.access_token);
    this.token.handle(data.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  handleError(error: any) {
    this.error = error.error.error;
  }
}
