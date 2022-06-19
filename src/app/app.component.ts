import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  
  constructor(
    private tokenStorageService: TokenStorageService,
    private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.user.name;
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']).then( (e) => {
      if (e) {
        window.location.reload();
      } 
    }); 
  }
}