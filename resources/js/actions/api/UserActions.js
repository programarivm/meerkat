import UserDispatcher from "../../dispatcher/api/UserDispatcher.js";
import UserActionTypes from '../../constants/api/UserActionTypes';

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

	show(id) {
		UserDispatcher.dispatch({
			type: UserActionTypes.SHOW,
			id: id
		});
	}

	update(id, data) {
		UserDispatcher.dispatch({
			type: UserActionTypes.UPDATE,
			id: id,
			user: data
		});
	}
}

export default new UserActions();
