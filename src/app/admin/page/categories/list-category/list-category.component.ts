import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { NotificationService } from 'src/app/service/notification.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService,private router:Router,private categoryService : CategoryService) { }
  listCategory = [];
  p:number = 1;
  pageSize:number = 20;
  message:any;
  fileName= 'ExcelSheet.xlsx';

  ngOnInit() {
    this.GetAllCategory();
  }

  GetAllCategory() {
    this.categoryService.GetListCategory().subscribe((res:any) => {
      console.log(res);
      if(res.code == 200) {
        this.listCategory = res.data;
        this.notification.showSuccess(res.message,"Success");
      }else if(res.code == 403) {
        this.listCategory = [];
        this.router.navigate(['/page/forbidden']);
      }else{
        this.listCategory = [];
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
