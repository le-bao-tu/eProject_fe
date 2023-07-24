import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userName:any;
  constructor(private jwtHelper: JwtHelperService) { }

  ngOnInit() {
    this.GetTokenByName();
  }

  GetTokenByName() {
    var token = localStorage.getItem('currentUser')
    const tokenDecode = this.jwtHelper.decodeToken(token);
    if(tokenDecode != null) {
      this.userName = tokenDecode.sub[0].Value;
    }
  }
}
