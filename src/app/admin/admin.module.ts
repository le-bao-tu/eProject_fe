import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2OrderModule } from "ng2-order-pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { IndexComponent } from "./page/index/index.component";
import { HomeComponent } from "./page/home/home.component";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { LoginComponent } from "./page/login/login.component";
import { OrganizationLogComponent } from "./page/organization-log/organization-log.component";
import { OrganizationLegalComponent } from "./page/organization-legal/organization-legal.component";
import { QuantityDateComponent } from "./page/quantity-date/quantity-date.component";
import { QuantityBrandnameComponent } from "./page/quantity-brandname/quantity-brandname.component";
import { QuantityOrganizationLegalComponent } from "./page/quantity-organization-legal/quantity-organization-legal.component";
import { AccountComponent } from "./page/account/account.component";

@NgModule({
  declarations: [IndexComponent, HomeComponent,HeaderComponent,FooterComponent,SidebarComponent, LoginComponent, OrganizationLogComponent, OrganizationLegalComponent, QuantityDateComponent,QuantityBrandnameComponent, QuantityOrganizationLegalComponent, AccountComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2OrderModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ],
})
export class AdminModule { }
