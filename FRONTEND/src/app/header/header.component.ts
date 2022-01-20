import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { ProductState } from 'shared/states/product-state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Client } from '../form/client';
import { ApiService } from '../api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Select(ProductState.getNbProducts) nbPanier$! : Observable<number>;
  client$ !: Observable<Client>;

  constructor(private router: Router, private store: Store, private api: ApiService) { 
  }

  ngOnInit(): void {

      this.client$ = this.api.currentUser
  }
  
  logout() {
    if (confirm("Are you sure you want to log out?")) {

      this.api.logout();
      this.router.navigate(['/logout']);
    }
  }

  
}

