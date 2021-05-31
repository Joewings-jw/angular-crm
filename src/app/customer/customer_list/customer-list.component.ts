import { Component, OnInit, ViewChild} from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

import * as _ from 'lodash';

import {MatDialog} from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';


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
    error_message: string;

    customers: Customer[] | any ;
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
    }

  
    all_customers (){
        this.service.all_customers().subscribe((customer)=>{
            this.customers = (customer.length > 0) ? [...customer] : null;
            this.freshDataList(this.customers)
            console.log(this.customers)
        },
        err=> this.error_message = <any>err 
        );
    }

   


  



}
