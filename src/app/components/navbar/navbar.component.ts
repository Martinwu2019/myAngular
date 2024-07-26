import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router} from '@angular/router'
import { TokenService } from '../../services/token.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  public loggedIn: boolean = false;

  constructor(private auth: AuthService,  private router: Router, private token: TokenService) { }

  ngOnInit() {
    this.auth.authStatus.subscribe(
      value => { this.loggedIn = value; }
    )
  }

  logout(event:MouseEvent){
    event.preventDefault(); // meaning it will not redirect anywhere
    this.token.remove();    // remove token
    this.auth.changeAuthStatus(false);    // when logged in, status is true, so we change it to false
    this.router.navigateByUrl('/login');
  }
}
