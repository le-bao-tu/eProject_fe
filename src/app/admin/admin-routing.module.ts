import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { IndexComponent } from './page/index/index.component';
import { ListUserComponent } from './page/users/list-user/list-user.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';

const routes: Routes = [
  {path:'',component:IndexComponent,children:[
    {path:'',component:HomeComponent},
    {path:'user/list-user',component:ListUserComponent},

  ]},
  {path: 'page/forbidden',component:ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }




