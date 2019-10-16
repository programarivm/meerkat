import GlobalDispatcher from "../dispatcher/GlobalDispatcher.js";
import GlobalActionTypes from '../constants/GlobalActionTypes';

class GlobalActions {
	ajaxStart() {
		GlobalDispatcher.dispatch({
			type: GlobalActionTypes.AJAX_START
		});
	}

	ajaxStop() {
		GlobalDispatcher.dispatch({
			type: GlobalActionTypes.AJAX_STOP
		});
	}

	login(data) {
		GlobalDispatcher.dispatch({
			type: GlobalActionTypes.LOGIN,
			credentials: data
		});
	}

	logout() {
		GlobalDispatcher.dispatch({
			type: GlobalActionTypes.LOGOUT
		});
	}
}

export default new GlobalActions();
