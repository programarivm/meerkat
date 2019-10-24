import ApiUserActionTypes from '../../constants/api/UserActionTypes';
import ApiUserDispatcher from "../../dispatcher/api/UserDispatcher.js";

class UserActions {
	create(data) {
		ApiUserDispatcher.dispatch({
			type: ApiUserActionTypes.CREATE,
			user: data
		});
	}

	delete(id) {
		ApiUserDispatcher.dispatch({
			type: ApiUserActionTypes.DELETE,
			id: id
		});
	}

	fetchAll() {
		ApiUserDispatcher.dispatch({
			type: ApiUserActionTypes.FETCH_ALL
		});
	}

	show(id) {
		ApiUserDispatcher.dispatch({
			type: ApiUserActionTypes.SHOW,
			id: id
		});
	}

	update(id, data) {
		ApiUserDispatcher.dispatch({
			type: ApiUserActionTypes.UPDATE,
			id: id,
			user: data
		});
	}
}

export default new UserActions();
