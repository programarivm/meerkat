import ApiAuthDispatcher from "../../dispatcher/api/AuthDispatcher.js";
import ApiAuthActionTypes from '../../constants/api/AuthActionTypes';

class AuthActions {
	login(data) {
		ApiAuthDispatcher.dispatch({
			type: ApiAuthActionTypes.LOGIN,
			credentials: data
		});
	}

	logout() {
		ApiAuthDispatcher.dispatch({
			type: ApiAuthActionTypes.LOGOUT
		});
	}
}

export default new AuthActions();
