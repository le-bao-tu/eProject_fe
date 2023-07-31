import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { ProductService } from 'src/app/service/product.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService,private router:Router,private productService:ProductService) { }
  listProduct = [];
  p:number = 1;
  pageSize = 20;
  message:any;
  fileName = 'ExcelSheet.xlsx';

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.GetListProducr().subscribe((res:any) => {
      console.log(res);
      if(res.code == 200) {
        this.listProduct = res.data;
        this.notification.showSuccess(res.message,"Success");
      }else if(res.code == 403) {
        this.listProduct = [];
        this.router.navigate(['/page/forbidden']);
      }else{
        this.listProduct = [];
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
