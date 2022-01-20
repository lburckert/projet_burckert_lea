import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Account } from "src/app/form/account";
import { Client } from "src/app/form/client";
import { DisconnectClient, UpdateClient } from "../actions/account-actions";
import { AccountStateModel } from "./account-state-model";

@State<AccountStateModel>({
	name: 'account',
	defaults: {
		account: null
	},
})

@Injectable()
export class AccountState {

	@Selector()
	static getAccount(state: AccountStateModel) {
		return state.account;
	}

	@Action(UpdateClient)
	updateClient(
		{ patchState }: StateContext<AccountStateModel>,
		{ payload }: UpdateClient
	) {
		patchState({
			account: payload,
		});
	}

	@Action(DisconnectClient)
	disconnectClient(
		{ patchState }: StateContext<AccountStateModel>,
	) {
		patchState({
			account: null,
		});
	}
}
