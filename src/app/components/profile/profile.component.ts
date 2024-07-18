import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit { // OnInit
  user: any = {};

  constructor(private backend: BackendService, private auth: AuthService) { }
  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile() {
    this.backend.getUserProfile().subscribe(
      (user: any) => {
        this.user = user;
        console.log('User fetched:', this.user);
        },
      (error: any) => {
        console.error('Failed to fetch user profile:', error);
      }
    );
  }

  passwordForm = {
    oldPassword: null,
    newPassword: null,
    confirmPassword: null
  };
  passwordError: string | null = null;

  changePassword() {
    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      this.passwordError = 'New password and confirm password do not match.';
      return;
    }

    const payload = {
      oldPassword: this.passwordForm.oldPassword,
      newPassword: this.passwordForm.newPassword,
      newPassword_confirmation: this.passwordForm.confirmPassword
    };
    
    console.log(this.passwordForm);
    console.log(payload);

    this.backend.updatePassword(payload).subscribe(
      () => {
        this.passwordError = null;
        alert('Password changed successfully.');
      },
      (error: any) => {
        this.passwordError = error.error.error || 'Failed to change password.';
      }
    );
  }
}