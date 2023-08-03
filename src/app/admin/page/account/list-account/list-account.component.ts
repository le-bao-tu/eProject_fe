import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';
import { NotificationService } from 'src/app/service/notification.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-account',
  templateUrl: './list-account.component.html',
  styleUrls: ['./list-account.component.css']
})
export class ListAccountComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService, private accountService : AccountService,private router:Router) { }

  listAccount = [];
  p:number = 1;
  pageSize:number = 20;
  message:any;
  fileName= 'ExcelSheet.xlsx';
  last:any;

  ngOnInit() {
    this.GetListAccount();
  }

  GetListAccount() {
    this.accountService.GetListAccount().subscribe((res: any) => {
      console.log(res);
      if (res.code == 200) {
        this.listAccount = res.data;
        this.last = this.listAccount[this.listAccount.length - 1];
        this.notification.showSuccess(res.message, "Success");
      }

      if (res.code == 403) {
        this.listAccount = [];
        this.router.navigate(['/admin/page/page/forbidden']);
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
