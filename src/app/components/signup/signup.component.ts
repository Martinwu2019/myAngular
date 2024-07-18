import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  public form = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  }

  constructor( private backend: BackendService, private router: Router){}

  ngOnInit(): void {}

  public error:any = [];
  public successMessage: string | null = null;
  submitSignup(){
    console.log(this.form);
    return this.backend.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error=>this.handleError(error)
    );
  }
  handleResponse (data: any) {
    console.log(data);
    alert('Your account has been created successfully!');
    this.successMessage = 'Your account has been created successfully!';
    this.router.navigateByUrl('/login');

  }
  handleError(error:any){
    this.error = error.error.errors;
  }
}
