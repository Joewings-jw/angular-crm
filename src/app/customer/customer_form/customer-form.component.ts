import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, MaxLengthValidator} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Customer } from '../customer';
import { CustomerService } from '../customer.service';

import { GenericValidator } from '../../shared/generic-validator';
import { NumberValidators } from '../../shared/number-validator';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';


@Component({
    selector: 'customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit, AfterViewInit {
  [x: string]: any;
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    page_title: string = 'Update Customer';
    error_message: string;
    customer_form: FormGroup;
    customer: Customer = <Customer>{};
    private sub: Subscription;
    show_image: boolean;
    image_width: number = 100;
    image_margin: number = 2;
    fieldColspan = 3;

      // Use with the generic validation message class
      displayMessage: { [key: string]: string } = {};
      private genericValidator: GenericValidator;
   

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    private validationMessages: { [key: string]: { [key: string]: string } | {} } = {
        firstname: {
            required: 'Customer first name is required.',
            minlength: 'Customer first name must be at least one characters.',
            maxlength: 'Customer first name cannot exceed 100 characters.'
        },
        lastname: {
            required: 'Customer last name is required.',
            minlength: 'Customer last name must be at least one characters.',
            maxlength: 'Customer last name cannot exceed 100 characters.'
        },
        email: {
            required: 'Customer email is required.',
            minlength: 'Customer email must be at least one characters.',
            maxlength: 'Customer email cannot exceed 200 characters.'
        },
        rewards: {
            range: 'Rewards of the customer must be between 0 (lowest) and 150 (highest).'
        },
        phone: { maxlength: 'Customer phone cannot exceed 12 characters.' },
        mobile: { maxlength: 'Customer mobile cannot exceed 12 characters.' },
    };

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private service: CustomerService,
        private breakpointObserver: BreakpointObserver
    ) {
        breakpointObserver.observe([
            Breakpoints.HandsetLandscape,
            Breakpoints.HandsetPortrait
        ]).subscribe(result => {
            // console.log(result)
            this.onScreensizeChange(result);
        });
        this.genericValidator = new GenericValidator(this.validationMessages);

    }

    ngOnInit(): void {
        this.customer_form = this.fb.group({
            firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
            rewards: ['', NumberValidators.range(0, 150)],
            phone: ['', Validators.maxLength(12)],
            mobile: ['', Validators.maxLength(12)],
            membership: false,
        });

    }

  
    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        const controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.customer_form.valueChanges, ...controlBlurs).debounceTime(500).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.customer_form);
        });
    }

    getCustomer(id: number): void {
        this.service.get_customerById(id)
            .subscribe(
                (customer: Customer) => this.onCustomerRetrieved(customer),
                (error: any) => this.error_message = <any>error
            );
    }

    onCustomerRetrieved(customer: Customer): void {
        if (this.customer_form) {
            this.customer_form.reset();
        }
        this.customer = customer;

        if (this.customer.id === 0) {
            this.page_title = 'New Customer';
        } else {
            this.page_title = `Customer: ${this.customer.first_name} ${this.customer.last_name}`;
        }

        // Update the data on the form
        this.customer_form.patchValue({
            firstname: this.customer.first_name,
            lastname: this.customer.last_name,
            email: this.customer.email,
            rewards: this.customer.rewards,
            phone: this.customer.phone,
            mobile: this.customer.mobile,
            membership: this.customer.membership
        });
    }

    deleteCustomer(): void {
        if (this.customer.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the customer: ${this.customer.first_name}?`)) {
                this.service.delete_customer(this.customer.id)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.error_message = <any>error
                    );
            }
        }
    }

    toggleImage(): void {
        this.event.preventDefault();
        this.show_image = !this.show_image;
    }


    saveCustomer(): void {
        if (this.customer_form.dirty && this.customer_form.valid) {
            // Copy the form values over the customer object values
            const customer = Object.assign({}, this.customer, this.customer_form.value);

            this.service.add_customer(customer)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.error_message = <any>error
                );
        } else if (!this.customer_form.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.customer_form.reset();
        this.router.navigate(['/customers']);
    }

    onScreensizeChange(result: any) {
        // debugger
        const isLess600 = this.breakpointObserver.isMatched('(max-width: 599px)');
        const isLess1000 = this.breakpointObserver.isMatched('(max-width: 959px)');
        console.log(
            ` isLess600  ${isLess600} 
            isLess1000 ${isLess1000}  `
        )
        if (isLess1000) {
            if (isLess600) {
                this.fieldColspan = 12;
            }
            else {
                this.fieldColspan = 6;
            }
        }
        else {
            this.fieldColspan = 3;
        }
    }
}

