import ApiCrudActionTypes from '../../constants/api/CrudActionTypes';
import ApiRestaurantDispatcher from "../../dispatcher/api/RestaurantDispatcher.js";

class RestaurantActions {
	create(data) {
		ApiRestaurantDispatcher.dispatch({
			type: ApiCrudActionTypes.CREATE,
			restaurant: data
		});
	}

	delete(id) {
		ApiRestaurantDispatcher.dispatch({
			type: ApiCrudActionTypes.DELETE,
			id: id
		});
	}

	fetchAll() {
		ApiRestaurantDispatcher.dispatch({
			type: ApiCrudActionTypes.FETCH_ALL
		});
	}

	show(id) {
		ApiRestaurantDispatcher.dispatch({
			type: ApiCrudActionTypes.SHOW,
			id: id
		});
	}

	update(id, data) {
		ApiRestaurantDispatcher.dispatch({
			type: ApiCrudActionTypes.UPDATE,
			id: id,
			restaurant: data
		});
	}
}

export default new RestaurantActions();
