import { Injectable } from '@angular/core';

import { Product } from '../../shared/models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Orderheader } from 'shared/models/orderheader';
import { Orderdetail } from 'shared/models/orderdetail';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public productsSubject : Subject<Array<Product>> = new Subject<Array<Product>>();
  products! : Array<Product>;
  allProducts! : Array<Product>;

  urlApiProducts = "/api/products/";
  urlApiOrder = "/api/order/"
  urlApiOrderHeader = "/api/order/header/"
  urlApiOrderDetail = "/api/order/detail/"

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  public getProducts(): Observable<Array<Product>> {

    console.log('getProducts');
    return this.httpClient.get<Array<Product>>(environment.apiUrl + this.urlApiProducts);
  }

  public getOrderProducts(client_id : number): Observable<Array<Orderheader>> {

    console.log('getOrderProducts');
    return this.httpClient.get<Array<Orderheader>>(environment.apiUrl + this.urlApiOrderHeader + client_id);
  }

  public getOrderDetailProducts(orderheader_id : string): Observable<Array<Orderdetail>> {

    console.log('getOrderDetailProducts');
    return this.httpClient.get<Array<Orderdetail>>(environment.apiUrl + this.urlApiOrderDetail + orderheader_id);
  }

  public getProduct(productId: number) {
    console.log(productId);

    const res = this.getProducts().pipe(    
      map(lstProducts => lstProducts.filter(product => product.product_id == productId))
    );
    return res;
  }

  public postOrder(client_id : number, product_id : Array<number>, reference : string, totalprice : number, devise : string, totalitemquantity : number ): Observable<any> {
    
    console.log("postOrder");
    
    let data: string = 
    "client_id=" + client_id + 
    "&product_id=" + product_id + 
    "&reference=" + reference + 
    "&totalprice=" + totalprice + 
    "&devise=" + devise +
    "&totalitemquantity=" + totalitemquantity;

    return this.httpClient.post<any>(environment.apiUrl + this.urlApiOrder, data, this.httpOptions);
  }

  public setProducts(data: any) : void {
    this.products = this.allProducts.slice();
    if (data["name"] !== "all") {
      this.products = this.products.filter(product => product.name === data["name"]);
    }
    if (data["brand"] !== "all") {
      this.products = this.products.filter(product => product.brand === data["brand"]);
    }
    if (data["price"] !== "all") {
      this.products = this.products.filter(product => product.price === data["price"]);
    }
    if (data["date"] !== "all") {
      this.products = this.products.filter(product => product.date === data["date"]);
    }
    if (data["description"] !== "all") {
      this.products = this.products.filter(product => product.description === data["description"]);
    }
    if (data["shortdescription"] !== "all") {
      this.products = this.products.filter(product => product.shortdescription === data["shortdescription"]);
    }
    if (data["pages"] !== "all") {
      this.products = this.products.filter(product => product.pages === data["pages"]);
    }
    if (data["ean"] !== "all") {
      this.products = this.products.filter(product => product.ean === data["ean"]);
    }
    if (data["picture"] !== "all") {
      this.products = this.products.filter(product => product.picture === data["picture"]);
    }
    if (data["logo"] !== "all") {
      this.products = this.products.filter(product => product.logo === data["logo"]);
    }
    this.emitProductSubject();
  }

  private emitProductSubject() {
    // slice : extrait le texte d'une chaine de caractères et retourne une nouvelle chaîne de caractères
    this.productsSubject.next(this.products.slice());
  }
}
