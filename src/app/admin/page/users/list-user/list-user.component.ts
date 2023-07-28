import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService, private userService : UserService,private router:Router) { }

  listUsers = [];
  p:number = 1;
  pageSize:number = 20;
  message:any;
  fileName= 'ExcelSheet.xlsx';
  last:any;

  ngOnInit() {
    this.GetListAccount();
  }

  GetListAccount() {
    this.userService.GetListUser().subscribe((res:any) => {
      console.log(res);
      if(res.code == 200) {
        this.listUsers = res.data
        this.last = this.listUsers[this.listUsers.length -1]
        this.notification.showSuccess(res.message,"Success");
      }

      if(res.code == 403) {
        this.listUsers = [];
        this.router.navigate(['/page/forbidden']);
      }
    })
  }

    onChange(sizeValue) {
      this.pageSize = sizeValue
    }

    // hàm xuất Excel
    exportexcel(): void
    {
      /* pass here the table id */
      let element = document.getElementById('excel-table');
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      /* save to file */
      XLSX.writeFile(wb, this.fileName);
    }

    // hàm sắp xếp
    key : string =  'id';
    reverse: boolean = false;
    sortby(key){
      this.key = key;
      this.reverse = !this.reverse;
    }
}
