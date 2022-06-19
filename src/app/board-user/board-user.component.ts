import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  currentUser: any;
  content?: any;

  constructor(
    private userService: UserService, 
    private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.loadPosts();
  }

  loadPosts(){
    this.userService.getUserPosts(this.currentUser.user.username).subscribe(
      data => {
        this.content = data;
        console.log('response my posts', data)
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
