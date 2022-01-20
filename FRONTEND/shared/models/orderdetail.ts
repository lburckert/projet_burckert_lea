export class Orderdetail {

	orderdetail_id: number;
	orderheader_id: number;
	product_name: string;

	constructor(orderdetail_id: number, orderheader_id: number, product_name: string) {
		this.orderdetail_id = orderdetail_id;
		this.orderheader_id = orderheader_id;
		this.product_name = product_name;
	}

	static fromJSON(item: any): Orderdetail {
		return new Orderdetail(
			item['orderdetail_id'],
			item['orderheader_id'],
			item['product_name'],
		);
	}
}