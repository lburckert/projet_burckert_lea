import { Client } from "src/app/form/client";

export class UpdateClient {
	static readonly type = "[Client] Update"

	constructor(public payload: Client) { }
}

export class DisconnectClient {
	static readonly type = "[Client] Remove"

	constructor() { }
}

export class GetClient {
	static readonly type = "[Client] Get"
}