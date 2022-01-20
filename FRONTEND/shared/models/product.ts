export class Product {

	product_id: number;
	name: string;
	description: string;
    shortdescription: string;
	logo: string;
    picture: string;
    price: number;
    date: Date;
    brand: string;
    pages: string;
    ean: string;


	constructor(product_id: number, name: string, description: string, shortdescription: string, logo: string, picture: string, price: number, date: Date, brand: string, pages: string, ean: string) {
		this.product_id = product_id;
		this.name = name;
		this.description = description;
        this.shortdescription = shortdescription;
        this.logo = logo;
        this.picture = picture;
        this.price = price;
        this.date = date;
        this.brand = brand;
        this.pages = pages;
		this.ean = ean;
	}

	static fromJSON(item: any): Product {
		return new Product(
			item['product_id'],
			item['name'],
			item['description'],
			item['shortdescription'],
			item['logo'],
            item['picture'],
            item['price'],
            item['date'],
            item['brand'],
            item['pages'],
            item['ean'],
		);

	}

}
