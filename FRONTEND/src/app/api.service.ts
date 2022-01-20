import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormComponent } from './form/form.component';
import { Client } from './form/client';
import { Account } from './form/account';
import { map } from 'rxjs/operators';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  urlApiLogin = "/api/login/"
  urlApiRegister = "/api/register/"
  urlApiUser = "/api/user/"
  urlApiProducts = "/api/products/"
  tokenParse: String = "";

  public currentUserSubject!: BehaviorSubject<Client>;
  public currentUser!: Observable<Client>;

  user_id!: number;

  constructor(private httpClient: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<Client>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  public get currentUserValue(): Client {
    return this.currentUserSubject.value;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  public postLogin(username: string, password: string) : Observable<Client> {

    console.log("postLogin");

    let data : string = "username=" + username + "&password="+password;

    return this.httpClient.post<Client>(environment.apiUrl + this.urlApiLogin, data, this.httpOptions)
  }

  public postRegistration(email: string, password: string, firstname: string, lastname: string, username: string, civility: string, address: string, city: string, phone: string, state: string, zip: string) : Observable<Client>  {
    
    console.log("poseRegsitration");
    let data: string = 
    "username=" + username + 
    "&password=" + password + 
    "&firstname=" + firstname + 
    "&lastname=" + lastname + 
    "&email=" + email +
    "&civility=" + civility +
    "&address=" + address +
    "&city=" + city +
    "&phone=" + phone +
    "&state=" + state +
    "&zip=" + zip;

    return this.httpClient.post<Client>(environment.apiUrl + this.urlApiRegister, data, this.httpOptions);
  }

  public getLogin(username: string) : Observable<Client> {

    console.log("getLogin");
    return this.httpClient.get<Client>(environment.apiUrl + this.urlApiLogin + username)
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
  }

  // public getUser(user_id: number) {
  //   return this.httpClient.get<any>(environment.apiUrl + this.urlApiUser + "/" + user_id, this.httpOptions);
  // }
}