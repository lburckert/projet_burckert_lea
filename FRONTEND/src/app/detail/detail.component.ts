import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

// lier le service Products
import { ProductsService } from '../products.service';
// lier class Product
import { Product } from '../../../shared/models/product';
import { Observable } from 'rxjs';
import { AddProduct } from 'shared/actions/product-action';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  product$!: Observable<Product[]>;
  product_id: number = 0;

  product!: Product;

  constructor(private route: ActivatedRoute, private productService: ProductsService, private store: Store) {

    this.product_id = this.route.snapshot.params.product_id;
    console.log(this.product_id);

    if (!this.product$) {
      console.log(this.product_id);
      this.product$ = this.productService.getProduct(this.product_id)
  
      this.product$.subscribe((event : any)=> this.product = Product.fromJSON(event.data));
    }
  }

  AddProductToCart(product : Product) {

    this.store.dispatch(new AddProduct(product));
    console.log(product);
  }

  ngOnInit(): void {

  }
}

