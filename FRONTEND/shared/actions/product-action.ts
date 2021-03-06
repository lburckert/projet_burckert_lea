import { Product } from '../models/product';

export class AddProduct {
  static readonly type = '[Product] Add';

  constructor(public payload: Product) {}
}

export class RemoveProduct {
  static readonly type = '[Product] Remove';

  constructor(public payload: Product) {}
}

export class EmptyCart {
	static readonly type = "[Product] Empty"
	constructor() { }
}