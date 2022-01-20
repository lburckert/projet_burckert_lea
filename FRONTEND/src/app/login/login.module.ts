import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from '../form/form.component';
import { RecapComponent } from '../recap/recap.component';
import { ActivateRecap } from '../activate-recap';
import { ActivateLogin } from '../activate-login';

const appChild: Routes = [
  {
    path: '/register',
    component: FormComponent,
    canActivate:[ActivateLogin]
  },
  {
    path: '/recap',
    component: RecapComponent,
    canActivate:[ActivateRecap]
  },
];

@NgModule({
  declarations: [RecapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(appChild),
    ReactiveFormsModule,
  ]
})
export class LoginModule { }
