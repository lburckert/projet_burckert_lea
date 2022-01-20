import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { FormComponent } from '../form/form.component';
import { Account } from '../form/account';
import { Observable, Subscription } from 'rxjs';
import { Client } from '../form/client';
import { UpdateClient } from 'shared/actions/account-actions';
import { Select, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { AccountState } from 'shared/states/account-state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  client$!: Observable<Client>;
  subscription !: Subscription;

  @Input() password: string = "";
  error: boolean = false;

  constructor(private formBuilder: FormBuilder, private api: ApiService, private store: Store, private router: Router) {
    this.loginForm = this.formBuilder.group({
      account: this.formBuilder.group({
        username: new FormControl('', Validators.compose([Validators.required, Validators.pattern(`.{5}.*`)])),
        password: new FormControl('', Validators.compose([Validators.required, Validators.pattern(`.{5}.*`)])),
      })
    });

    this.onValueChanges();
  }

  onValueChanges() {
    this.loginForm.valueChanges.subscribe(val => {
    })
  }

  submit() {

    const account = new Account(
      this.loginForm.value.account.username,
      this.loginForm.value.account.password
    );

    console.log(account.username);
    console.log(account.password);

    if (this.loginForm.valid) {
      this.api.postLogin(account.username, account.password).subscribe(
        data => {
          console.log(data);
          this.client$ = this.api.getLogin(account.username)
          this.client$.subscribe(
            (client) => {
              localStorage.setItem('currentUser', JSON.stringify(client));
              console.log("client " + client.account.username);
              this.api.currentUserSubject.next(client);
            }
          );
          this.router.navigate(["/recap"]);
        },
        error => {
          console.log(error);
          this.error = true;
        }
      );
    }
    else {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  ngOnInit(): void {
  }
}
