import ApiAuthActionTypes from '../../constants/api/AuthActionTypes';
import ApiAuthDispatcher from '../../dispatcher/api/AuthDispatcher';

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
