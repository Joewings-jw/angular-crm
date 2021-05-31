import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { Customer } from './customer';


@Injectable({
  providedIn: 'root',
})

export class CustomerService {
  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  all_customers(): Observable<any> {
    return this.http.get(this.api + '/customers');
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

