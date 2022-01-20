import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormComponent } from './form/form.component';
import { RecapComponent } from './recap/recap.component';
import { NumberFormatPipe } from './number-format.pipe';
import { ProductsComponent } from './products/products.component';
import { SearchengineComponent } from './searchengine/searchengine.component';
import { NgxsModule } from '@ngxs/store';

import { ProductsService } from './products.service';

import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { CartComponent } from './cart/cart.component';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { ProductState } from 'shared/states/product-state';
import { LoginComponent } from './login/login.component';

import { ApiHttpInterceptor } from './api-http-interceptor';
import { ConfirmPasswordDirective } from './confirm-password.directive';
import { LogoutComponent } from './logout/logout.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderHistoryDetailComponent } from './order-history-detail/order-history-detail.component';

const appRoot: Routes = [

  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'register',
    component: FormComponent,
  },

  {
    path: 'catalog',
    component: ProductsComponent,
  },

  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'cart',
    component: CartComponent,
  },

  {
    path: 'detail-produit/:product_id',
    component: DetailComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'logout',
    component: LogoutComponent,
  },

  {
    path: 'recap',
    component: RecapComponent,
  },

  {
    path: 'order-history-header',
    component: OrderHistoryComponent,
  },

  {
    path: 'order-history-detail/:orderheader_id',
    component: OrderHistoryDetailComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FormComponent,
    RecapComponent,
    NumberFormatPipe,
    ProductsComponent,
    SearchengineComponent,
    CartComponent,
    DetailComponent,
    HomeComponent,
    LoginComponent,
    ConfirmPasswordDirective,
    LogoutComponent,
    OrderHistoryComponent,
    OrderHistoryDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxsModule.forRoot([ProductState]),
    RouterModule,
    RouterModule.forRoot(appRoot)
  ],
  exports: [RouterModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
