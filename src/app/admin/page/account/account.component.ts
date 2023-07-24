import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from 'src/app/service/account.service';
import { NotificationService } from 'src/app/service/notification.service';
import { OrganizationLegalService } from 'src/app/service/organization-legal.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService,private jwtHelper: JwtHelperService,private organizationlegal:OrganizationLegalService,private account:AccountService) { }

  listAccount = [];
  listStatus = [];
  p:number = 1;
  pageSize:number = 20;
  message:any;
  checkAuthen:boolean = true;

  myGroup = this.fb.group({
    "unitId":[this.GetUnitId()],
    "status":[""],
    "name":[null]
  })

  ngOnInit() {
    this.GetUnitId();
    this.GetListStatusAccount();
    this.GetListAccount();
  }

  GetUnitId() {
    var token = localStorage.getItem('currentUser')
    const tokenDecode = this.jwtHelper.decodeToken(token);
    if(tokenDecode != null) {
      var unitId = tokenDecode.sub[1].Value;
      return unitId;
    }
  }

  GetListStatusAccount() {
    this.organizationlegal.GetListStatusOrganizationlegal().subscribe((res:any) => {
      console.log(res);
      if(res) {
        this.listStatus = res.data
      }
    })
  }

  GetListAccount() {
    var checkStatus = this.myGroup.controls.status.value;
    if(checkStatus == "") {
      checkStatus = null;
    }
    let model= {
      ...this.myGroup.value,
      status: checkStatus,
    }
    this.account.GetListAccount(model).subscribe((res:any) => {
      console.log(res);
      if(res.code == 200) {
        this.listAccount = res.data
      }
      if(res.code === 403) {
        this.listAccount = [];
        this.message = res.message;
        this.checkAuthen = false;
      }
      if(res.code === 500) {
        this.listAccount = [];
        this.notification.showSuccess("Lấy dữ liệu thành công","Success");
      }
    })
   }

   Search() {
    var name = this.myGroup.controls.name.value;
    if(name == "") {
      this.ngOnInit();
    }else{
      this.listAccount = this.listAccount.filter(res => {
        return res.userName.toLocaleLowerCase().match(name.toLocaleLowerCase());
      })
    }
  }

  onSubmit() {
    this.GetListAccount();
  }

     // hàm sắp xếp
     key : string =  'id';
     reverse: boolean = false;
     sortby(key){
       this.key = key;
       this.reverse = !this.reverse;
     }
}
