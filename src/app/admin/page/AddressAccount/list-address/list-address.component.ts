import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressAccountService } from 'src/app/service/address-account.service';
import { NotificationService } from 'src/app/service/notification.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-address',
  templateUrl: './list-address.component.html',
  styleUrls: ['./list-address.component.css']
})
export class ListAddressComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService,private router:Router, private accountService :  AddressAccountService) { }
  listAddress = [];
  p:number = 1;
  pageSize = 20;
  message:any;
  fileName = 'ExcelSheet.xlsx';

  ngOnInit() {
    this.GetAllAddressAccount();
  }

  GetAllAddressAccount() {
    this.accountService.GetListAddressAccount().subscribe((res:any) => {
      console.log(res)
      if(res.code == 200) {
        this.listAddress = res.data;
        this.notification.showSuccess(res.message,"Success");
      }else if(res.code == 403) {
        this.listAddress = [];
        this.router.navigate(['/page/forbidden']);
      }else{
        this.listAddress = [];
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
  }

     // hàm sắp xếp
     key : string =  'id';
     reverse: boolean = false;
     sortby(key){
       this.key = key;
       this.reverse = !this.reverse;
     }
}
