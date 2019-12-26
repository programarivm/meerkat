import ApiUserActionTypes from '../../constants/api/UserActionTypes';
import ApiUserDispatcher from "../../dispatcher/api/UserDispatcher.js";
import { EventEmitter } from 'events';

class UserStore extends EventEmitter {
	constructor() {
		super();
		ApiUserDispatcher.register(this.handleActions.bind(this));
	}

	create(data) {
		fetch(process.env.MIX_APP_URL + '/api/users', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then((res) => {
			switch (res.status) {
				case 201:
					this.emit("create.201");
					break;
				default:
					this.emit("create.error");
					break;
			}
		});
	}

	delete(id) {
		fetch(process.env.MIX_APP_URL + `/api/users/${id}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			switch (res.status) {
				case 204:
					this.emit("delete.204");
					break;
				default:
					this.emit("delete.error");
					break;
			}
		});
	}

	fetchAll() {
		fetch(process.env.MIX_APP_URL + '/api/users', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			if (res.status !== 200) throw new Error(res.status);
			else return res.json();
		})
		.then((data) => {
			this.emit("fetch_all.200", data);
		})
		.catch((error) => {
			this.emit("fetch_all.error");
		});
	}

	show(id) {
		fetch(process.env.MIX_APP_URL + `/api/users/${id}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			if (res.status !== 200) throw new Error(res.status);
			else return res.json();
		})
		.then((data) => {
			this.emit("show.200", data);
		})
		.catch((error) => {
			this.emit("show.error");
		});
	}

	update(id, data) {
		fetch(process.env.MIX_APP_URL + `/api/users/${id}`, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then((res) => {
			switch (res.status) {
				case 200:
					this.emit("update.200");
					break;
				default:
					this.emit("update.error");
					break;
			}
		});
	}

	handleActions(action) {
		switch (action.type) {
			case ApiUserActionTypes.CREATE:
				this.create(action.user);
				break;
			case ApiUserActionTypes.DELETE:
				this.delete(action.id);
				break;
			case ApiUserActionTypes.FETCH_ALL:
				this.fetchAll();
				break;
			case ApiUserActionTypes.SHOW:
				this.show(action.id);
				break;
			case ApiUserActionTypes.UPDATE:
				this.update(action.id, action.user);
				break;
			default:
        // do nothing
		}
	}
}

export default new UserStore();
