import GlobalActionTypes from '../constants/GlobalActionTypes';
import GlobalDispatcher from "../dispatcher/GlobalDispatcher.js";
import { EventEmitter } from 'events';

class GlobalStore extends EventEmitter {
	constructor() {
		super();
		this.state = {
			'authenticated': false
		};
		GlobalDispatcher.register(this.handleActions.bind(this));
	}

	getState() {
		return this.state;
	}

	login(credentials) {
		fetch(process.env.MIX_APP_URL + '/api/auth/login', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		}).then((res) => {
			switch (res.status) {
				case 204:
					this.state.authenticated = true;
					this.emit("login_204");
					break;
				case 401:
					this.emit("login_401");
					break;
				default:
					this.emit("login_error");
					break;
			}
		});
	}

	logout() {
		fetch(process.env.MIX_APP_URL + '/api/auth/logout', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			switch (res.status) {
				case 204:
					this.state.authenticated = false;
					this.emit("logout_204");
					break;
				case 401:
					this.emit("logout_401");
					break;
				default:
					this.emit("logout_error");
					break;
			}
		});
	}

	handleActions(action) {
		switch (action.type) {
			case GlobalActionTypes.LOGIN:
				this.login(action.credentials);
				break;
			case GlobalActionTypes.LOGOUT:
				this.logout();
				break;
			default:
        // do nothing
		}
	}
}

export default new GlobalStore();
