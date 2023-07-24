import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName:any;
  constructor(private jwtHelper: JwtHelperService,private router:Router) { }

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

  Logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['Medlatec/login'])
  }
}
