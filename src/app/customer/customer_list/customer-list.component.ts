import { Component, OnInit, ViewChild} from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

import * as _ from 'lodash';

import { MatFormFieldControl } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



@Component({
    selector: 'customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.css'],
   
})
export class CustomerListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    

    page_title: string = 'Customers';
    image_width: number = 30;
    image_margin: number = 2;
    show_image: boolean = false;
    list_filter: any = {};
    error_message: string;

    customers: Customer[] | any;
    customer_list: Customer[]; //
    displayedColumns = ["avatar", "first_name", "last_name", "rewards", "email", "membership", "id"];
    dataSource: any = null;
    pager: any = {};
    paged_items: any[];
    search_filter: any = {
        first_name: "",
        last_name: "",
        email: ""
    };
    


    constructor(
        private service: CustomerService) {
    }


    freshDataList(customers: Customer[]) {
        this.customers = customers;

        this.dataSource = new MatTableDataSource(this.customers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
 
    ngOnInit(): void {
        this.all_customers()

        this.  search_filter = {};
        this.list_filter = {};
       
    }

  
    all_customers (){
        this.service.all_customers().subscribe((customer)=>{
            this.customers = (customer.length > 0) ? [...customer] : null;
            this.freshDataList(this.customers);


            console.log(this.customers)
        },
        err=> this.error_message = <any>err 
        );
    }

    searchCustomers(filters: any ) {
        if (filters) {
            this.service.all_customers()
                .subscribe(customers => {
                    this.customers = customers;
                    console.log(this.customers.length)
                    this.customers = this.customers.filter((customer: Customer[] | any) => {
                        let match = true;

                        Object.keys(filters).forEach((k) => {
                            match = match && filters[k] ?
                                customer[k].toLocaleLowerCase().indexOf(filters[k].toLocaleLowerCase()) > -1 : match;
                        })
                        return match;
                    });
                    this.freshDataList(customers);
                },
                error => this.error_message = <any>error);
        }

    }

    
    

  



}
