import ApiCrudActionTypes from '../../constants/api/CrudActionTypes';
import ApiUserDispatcher from "../../dispatcher/api/UserDispatcher.js";

class UserActions {
	create(data) {
		ApiUserDispatcher.dispatch({
			type: ApiCrudActionTypes.CREATE,
			user: data
		});
	}

	delete(id) {
		ApiUserDispatcher.dispatch({
			type: ApiCrudActionTypes.DELETE,
			id: id
		});
	}

	fetchAll() {
		ApiUserDispatcher.dispatch({
			type: ApiCrudActionTypes.FETCH_ALL
		});
	}

	show(id) {
		ApiUserDispatcher.dispatch({
			type: ApiCrudActionTypes.SHOW,
			id: id
		});
	}

	update(id, data) {
		ApiUserDispatcher.dispatch({
			type: ApiCrudActionTypes.UPDATE,
			id: id,
			user: data
		});
	}
}

export default new UserActions();
