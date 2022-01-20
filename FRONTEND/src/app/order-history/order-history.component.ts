import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Orderheader } from 'shared/models/orderheader';
import { Product } from 'shared/models/product';
import { ApiService } from '../api.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orderheaders$!: Observable<Array<Orderheader>>;
  observer: any;

  constructor(private productService: ProductsService, private store: Store, private api: ApiService) { }

  ngOnInit(): void {

    console.log('Order history');

    this.orderheaders$ = this.productService.getOrderProducts(this.api.currentUserValue.id);

    if (this.observer) {
      this.observer.unsubscribe();
    }
    
    this.observer = this.orderheaders$.subscribe(
      (value) => {
        console.log(value);
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('End');
      }
    );
  }
}
