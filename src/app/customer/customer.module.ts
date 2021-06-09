import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CustomerListComponent } from "../customer/customer_list/customer-list.component";
import { CustomerFormComponent } from "../customer/customer_form/customer-form.component";
import { CustomerService } from "./customer.service";
import { MaterialModule } from "../shared/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [CustomerListComponent,
    CustomerFormComponent,
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: "", component: CustomerListComponent },
      {
        path: "new/",
        component: CustomerFormComponent
      },
      {
        path: "edit/:id",
        component: CustomerFormComponent
      }
    ])
  ],
  providers:[CustomerService],
  exports: [CustomerListComponent,
    CustomerFormComponent,
  ]
})
export class CustomerModule { }
