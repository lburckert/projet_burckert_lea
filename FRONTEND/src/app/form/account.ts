export class Account {

	username: string;
	password: string;

	constructor(
		username: string,
		password: string,
	) {
		this.username = username;
		this.password = password;
	}

	static fromJSON(item: any): Account {
		return new Account(
			item['username'],
			item['hashedpassword']
		);
	}
}