import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Orderdetail } from 'shared/models/orderdetail';
import { Orderheader } from 'shared/models/orderheader';
import { ApiService } from '../api.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-order-history-detail',
  templateUrl: './order-history-detail.component.html',
  styleUrls: ['./order-history-detail.component.scss']
})
export class OrderHistoryDetailComponent implements OnInit {

  orderdetails$!: Observable<Array<Orderdetail>>;
  observer: any;

  constructor(private productService: ProductsService, private store: Store, private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    console.log('Order detail history');

    this.orderdetails$ = this.productService.getOrderDetailProducts(this.route.snapshot.params.orderheader_id);

    if (this.observer) {
      this.observer.unsubscribe();
    }
    
    this.observer = this.orderdetails$.subscribe(
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
