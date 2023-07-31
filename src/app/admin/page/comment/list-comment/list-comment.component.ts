import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentService } from 'src/app/service/comment.service';
import { NotificationService } from 'src/app/service/notification.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent implements OnInit {

  constructor(private fb:FormBuilder,private notification:NotificationService,private router:Router,private commentService:CommentService) { }
  listComment = [];
  p:number = 1;
  pageSize:number = 20;
  message:any;
  fileName= 'ExcelSheet.xlsx';

  ngOnInit() {
    this.GetAllComment()
  }

  GetAllComment() {
    this.commentService.GetListAddressAccount().subscribe((res:any) =>{
      console.log(res)
      if(res.code == 200) {
        this.listComment = res.data;
        this.notification.showSuccess(res.message,"Success");
      }else if(res.code == 403) {
        this.listComment = [];
        this.router.navigate(['/page/forbidden']);
      }else{
        this.listComment = [];
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
