import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EmptyCart, RemoveProduct } from 'shared/actions/product-action';
import { Product } from 'shared/models/product';
import { ProductState } from 'shared/states/product-state';
import { ApiService } from '../api.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Select(ProductState.getListProducts)
  products$!: Observable<Array<Product>>;
  justOrdered : boolean = false;

  constructor(private store: Store, private productService: ProductsService, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  RemoveProductToCart(prod: Product){
    this.store.dispatch(new RemoveProduct(prod));
  }

  buyCart() {

    if (confirm("Please confirm the order")) { 

      let totalPrice = 0;
      let totalQantity = 0;
      let listProductId : number [] = [];
      let products = this.store.selectSnapshot(ProductState.getListProducts);

      products.forEach(product => {listProductId.push(product.product_id)
      
        totalPrice += product.price;
        totalQantity ++;
      });

      if (this.api.currentUserValue == null) {

        if (confirm("To order you must log in, do you want to try again?")) { 
  
          this.router.navigate(['/login']);
        }
      } else {

        this.productService.postOrder(this.api.currentUserValue.id, listProductId, "556-1-", totalPrice, "EUR", totalQantity).subscribe();
      
        this.store.dispatch(new EmptyCart());
        this.justOrdered = true;
      }
    }
  }
}
