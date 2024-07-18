import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  public loggedIn: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.authStatus.subscribe(
      value => { this.loggedIn = value; }
    )
  }
}
