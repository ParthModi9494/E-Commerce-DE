import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: object;

  constructor(public authSerive: AuthService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    this.authSerive.logout();
  }

}
