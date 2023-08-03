import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(private fb:FormBuilder,private categoryService:CategoryService,private router:Router,private notification:NotificationService) { }

  selectedFile: File;

  // check dữ liệu liệu form
  infoForm = this.fb.group({
    "categoryName":["",[Validators.required,Validators.maxLength(20),Validators.pattern('^[a-zA-Z0-9]+$')]],
    "fileImage":[],
    "status":true,
})

onFileChange(event: any) {
  this.selectedFile = event.target.files[0];
}

ngOnInit():void {
}

get f() {
  return this.infoForm.controls
}

onSubmit() {
    // đoạn này sẽ for check đièu kiện của form nếu không hợp lệ sẽ hiển thị ra lỗi
    for (const i in this.infoForm.controls) {
      this.infoForm.controls[i].markAsDirty();
      this.infoForm.controls[i].updateValueAndValidity();
    }
    let model = {
      ...this.infoForm.value,
      fileImage : this.selectedFile
    }
    this.categoryService.CreateCategory(model).subscribe((res:any)=>{
      console.log(res);
      if(res.code == 200) {
        this.router.navigate(['category/list-category'])
        this.notification.showSuccess(res.message,"Success")
      }else{
        this.notification.showError(res.message,"Error")
      }
    })
  }
}
