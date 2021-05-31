import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CustomerListComponent } from "../customer/customer_list/customer-list.component";
import { CustomerService } from "./customer.service";
import { MaterialModule } from "../shared/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: "", component: CustomerListComponent },
    ])
  ],
  providers:[CustomerService],
  exports: [CustomerListComponent]
})
export class CustomerModule { }
