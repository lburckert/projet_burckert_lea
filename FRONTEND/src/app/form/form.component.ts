import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UpdateClient } from 'shared/actions/account-actions';
import { ApiService } from '../api.service';
import { Account } from './account';
import { Client } from './client';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent  implements OnInit {
    signUpForm!: FormGroup;
    submitted = false;

    client!: Client;

    constructor(private formBuilder: FormBuilder, private api: ApiService, private store: Store, private router: Router) { }

    ngOnInit() {
        this.signUpForm = this.formBuilder.group({
            civility: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            acceptTerms: [false, Validators.requiredTrue],
            address: ['', [Validators.required]],
        	zip: ['', [Validators.required, Validators.minLength(5)]],
            city: ['', Validators.compose([Validators.required, Validators.pattern(`^([a-zA-Z\\u0080-\\u024F]+(?:. |-| |'))*[a-zA-Z\\u0080-\\u024F]*$`)])],
            state: ['', [Validators.required]],
            phone: ['', Validators.compose([Validators.required, Validators.pattern(`^[0-9]{10}|\\+33[0-9]{13}$`)])],
            username: ['', [Validators.required, Validators.minLength(6)]]
        }, {
            validator: this.MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.signUpForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.signUpForm.invalid) {
            return;
        }
        console.log(this.signUpForm.value);
        console.log(this.signUpForm.value.username);

        const account = new Account(
            this.signUpForm.value.username,
            this.signUpForm.value.password
          );
      
        const client = new Client(
            -1,
            this.signUpForm.value.lastname,
            this.signUpForm.value.firstname,
            this.signUpForm.value.civility,
            this.signUpForm.value.address,
            this.signUpForm.value.zip,
            this.signUpForm.value.city,
            this.signUpForm.value.state,
            this.signUpForm.value.email,
            this.signUpForm.value.phone,
            account
        );

        if (this.signUpForm.valid) {
            this.api.postRegistration(client.email, client.account.password, client.firstname, client.lastname, client.account.username, client.civility, client.address, client.city, client.phone, client.state, client.zip).subscribe(
              data => {
                console.log("navigate login");
                this.router.navigate(["/login"]);
              },
              error => {
                console.log(error);
              }
            );
          }
          else {
            Object.keys(this.signUpForm.controls).forEach(field => {
              const control = this.signUpForm.get(field);
              control?.markAsTouched({ onlySelf: true });
            });
          }
    }

    onReset() {
        this.submitted = false;
        this.signUpForm.reset();
    }

    MustMatch(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];
  
          if (matchingControl.errors && !matchingControl.errors.mustMatch) {
              // return if another validator has already found an error on the matchingControl
              return;
          }
          // set error on matchingControl if validation fails
          if (control.value !== matchingControl.value) {
              matchingControl.setErrors({ mustMatch: true });
          } else {
              matchingControl.setErrors(null);
          }
      }
    }
}