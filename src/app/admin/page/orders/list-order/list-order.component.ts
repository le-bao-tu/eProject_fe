import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { OrderService } from 'src/app/service/order.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService,private router:Router,private orderService:OrderService) { }

  listOrder = [];
  p:number = 1;
  pageSize:number = 20;
  message:any;
  fileName= 'ExcelSheet.xlsx';

  onChange(sizeValue) {
    this.pageSize = sizeValue
  }


  ngOnInit() {
    this.GetAllOrder();
  }

  GetAllOrder() {
    this.orderService.GetListOrder().subscribe((res:any) => {
      console.log(res)
      if(res.code == 200) {
        this.listOrder = res.data;
        this.notification.showSuccess(res.message,"Success");
      }else if(res.code == 403) {
        this.listOrder = [];
        this.router.navigate(['/page/forbidden']);
      }else{
        this.listOrder = [];
      }
    })
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
