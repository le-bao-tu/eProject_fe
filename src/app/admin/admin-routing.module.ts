import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { IndexComponent } from './page/index/index.component';
import { OrganizationLogComponent } from './page/organization-log/organization-log.component';
import { OrganizationLegalComponent } from './page/organization-legal/organization-legal.component';
import { QuantityDateComponent } from './page/quantity-date/quantity-date.component';
import { QuantityOrganizationLegalComponent } from './page/quantity-organization-legal/quantity-organization-legal.component';
import { QuantityBrandnameComponent } from './page/quantity-brandname/quantity-brandname.component';
import { AccountComponent } from './page/account/account.component';

const routes: Routes = [
  {path:'',component:IndexComponent,children:[
    {path:'',component:HomeComponent},
    {path:'Medlatec/log',component:OrganizationLogComponent},
    {path:'Medlatec/organization-legel',component:OrganizationLegalComponent},
    {path:'Medlatec/quantity-date',component:QuantityDateComponent},
    {path:'Medlatec/quantity-brandName',component:QuantityBrandnameComponent},
    {path:'Medlatec/quantity-organization-legal',component:QuantityOrganizationLegalComponent},
    {path:'Medlatec/list-account',component:AccountComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule]
})
export class AdminRoutingModule { }




