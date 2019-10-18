import UserDispatcher from "../dispatcher/UserDispatcher.js";
import UserActionTypes from '../constants/UserActionTypes';

class UserActions {
	create(data) {
		UserDispatcher.dispatch({
			type: UserActionTypes.CREATE,
			user: data
		});
	}

	delete(id) {
		UserDispatcher.dispatch({
			type: UserActionTypes.DELETE,
			id: id
		});
	}

	fetchAll() {
		UserDispatcher.dispatch({
			type: UserActionTypes.FETCH_ALL
		});
	}
}

export default new UserActions();
