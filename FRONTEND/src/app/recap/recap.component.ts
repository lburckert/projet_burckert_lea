import { Component, Input, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountState } from 'shared/states/account-state';
import { ApiService } from '../api.service';
import { Account } from '../form/account';
import { Client } from '../form/client';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss']
})
export class RecapComponent implements OnInit {

  currentUser$!: Observable<Client>;

  constructor(private api: ApiService) {

    this.currentUser$ = this.api.currentUser;
    console.log(this.currentUser$);
  }

  ngOnInit(): void {
  }
}
