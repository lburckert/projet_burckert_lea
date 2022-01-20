import { Account } from "./account";

export class Client {

	id: number;
	lastname: string;
	firstname: string;
	civility: string;
    address: string;
	zip: string;
	city: string;
	state: string;
    email: string;
	phone: string;
	account: Account;

	constructor(
		id: number,
		lastname: string,
		firstname: string,
		civility: string,
        address: string,
        zip: string,
		city: string,
        state: string,
        email: string,
        phone: string,
		account: Account
	) {
		this.id = id;
		this.lastname = lastname;
		this.firstname = firstname;
		this.civility = civility;
        this.address = address;
		this.zip = zip;
		this.city = city;
		this.state = state;
		this.email = email;
		this.phone = phone;
		this.account = account;
	}

	static fromJSON(item: any): Client {
		return new Client(
			item['id'],
			item['lastname'],
			item['firstname'],
			item['civility'],
			item['address'],
			item['zip'],
			item['city'],
			item['state'],
			item['email'],
			item['phone'],
			Account.fromJSON(item['account'])
		);
	}
}