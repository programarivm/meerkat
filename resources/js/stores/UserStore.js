import UserActionTypes from '../constants/UserActionTypes';
import UserDispatcher from "../dispatcher/UserDispatcher.js";
import { EventEmitter } from 'events';

class UserStore extends EventEmitter {
	constructor() {
		super();
		UserDispatcher.register(this.handleActions.bind(this));
	}

	create(data) {
		fetch(process.env.MIX_APP_URL + '/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then((res) => {
			switch (res.status) {
				case 201:
					this.emit("user_create_succeeded");
					break;
				default:
					this.emit("user_create_failed");
					break;
			}
		});
	}

	delete(id) {
		fetch(process.env.MIX_APP_URL + `/api/users/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			switch (res.status) {
				case 204:
					this.emit("user_delete_succeeded");
					break;
				default:
					this.emit("user_delete_failed");
					break;
			}
		});
	}

	fetchAll() {
		fetch(process.env.MIX_APP_URL + '/api/users', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			if (res.status !== 200) throw new Error(res.status);
			else return res.json();
		})
		.then((data) => {
			this.emit("user_fetch_all_succeeded", data);
		})
		.catch((error) => {
			this.emit("user_fetch_all_failed");
		});
	}

	handleActions(action) {
		switch (action.type) {
			case UserActionTypes.CREATE:
				this.create(action.user);
				break;
			case UserActionTypes.DELETE:
				this.delete(action.id);
				break;
			case UserActionTypes.FETCH_ALL:
				this.fetchAll();
				break;
			default:
        // do nothing
		}
	}
}

export default new UserStore();
