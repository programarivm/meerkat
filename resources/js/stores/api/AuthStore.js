import ApiAuthActionTypes from '../../constants/api/AuthActionTypes';
import ApiAuthDispatcher from "../../dispatcher/api/AuthDispatcher.js";
import { EventEmitter } from 'events';

class AuthStore extends EventEmitter {
	constructor() {
		super();
		ApiAuthDispatcher.register(this.handleActions.bind(this));
	}

	/**
	 * A non-HttpOnly cookie named "session" is sent by the server when the user is successfully logged in.
	 */
	login(credentials) {
		fetch(process.env.MIX_APP_URL + '/api/auth/login', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		}).then((res) => {
			switch (res.status) {
				case 204:
					this.emit("login.204");
					break;
				case 401:
					this.emit("login.401");
					break;
				default:
					this.emit("login.error");
					break;
			}
		});
	}

	logout() {
		fetch(process.env.MIX_APP_URL + '/api/auth/logout', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			switch (res.status) {
				case 204:
					this.emit("logout.204");
					break;
				case 401:
					this.emit("logout.401");
					break;
				default:
					this.emit("logout.error");
					break;
			}
		});
	}

	handleActions(action) {
		switch (action.type) {
			case ApiAuthActionTypes.LOGIN:
				this.login(action.credentials);
				break;
			case ApiAuthActionTypes.LOGOUT:
				this.logout();
				break;
			default:
        // do nothing
		}
	}
}

export default new AuthStore();
