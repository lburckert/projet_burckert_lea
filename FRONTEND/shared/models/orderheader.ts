export class Orderheader {

	orderheader_id: number;
	reference: string;
	totalprice: number;
    devise: string;
	totalitemquantity: number;

	constructor(orderheader_id: number, reference: string, totalprice: number, devise: string, totalitemquantity: number) {
		this.orderheader_id = orderheader_id;
		this.reference = reference;
		this.totalprice = totalprice;
        this.devise = devise;
        this.totalitemquantity = totalitemquantity;
	}

	static fromJSON(item: any): Orderheader {
		return new Orderheader(
			item['orderheader_id'],
			item['reference'],
			item['totalprice'],
			item['devise'],
			item['totalitemquantity']
		);
	}
}