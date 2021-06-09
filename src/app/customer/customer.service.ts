import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { Customer } from './customer';
import { CustomerListComponent } from './customer_list';


@Injectable({
  providedIn: 'root',
})

export class CustomerService {
  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  all_customers(): Observable<any> {
    return this.http.get(this.api + '/customers');
  }

  get_customerById(id:any): Observable<any> {CustomerListComponent
    let endPoints = "/customers/" + id;
    return this.http.get(this.api + endPoints);
  }

  add_customer(new_customer: Object): Observable<any>  {
    let endPoints = "/customers"
    return this.http.post(this.api + endPoints, new_customer);
  }

  update_customer(new_customer: Object): Observable<any>  {
    let endPoints = "/customers/1"
    return this.http.put(this.api + endPoints, new_customer);
  }

  delete_customer(id:any): Observable<any>  {
    let endPoints = "/customers/"
    return this.http.delete(this.api + endPoints);
  }




  initializeCustomer(): Customer {
    // Return an initialized object
    return {
      id: 0,
      avatar: null,
      first_name: null,
      last_name: null,
      rewards: 0,
      email: null,
      membership: false,
      mobile: null,
      phone:null
    };
  }
}

