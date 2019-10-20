import GlobalActionTypes from '../constants/GlobalActionTypes';
import GlobalDispatcher from "../dispatcher/GlobalDispatcher.js";
import { EventEmitter } from 'events';
import Cookies from 'js-cookie';

class GlobalStore extends EventEmitter {
	/**
	 * A non-HttpOnly cookie named "gui" is sent by the server when the user is logged in.
	 */
	constructor() {
		super();
		this.state = {
			gui: {
				role: null
			}
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
					this.state.gui = JSON.parse(Cookies.get("gui"));
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
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			switch (res.status) {
				case 204:
					this.state.gui.role = null;
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
