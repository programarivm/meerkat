import ApiRestaurantActionTypes from '../../constants/api/RestaurantActionTypes';
import ApiRestaurantDispatcher from "../../dispatcher/api/RestaurantDispatcher.js";

class RestaurantActions {
	create(data) {
		ApiRestaurantDispatcher.dispatch({
			type: ApiRestaurantActionTypes.CREATE,
			restaurant: data
		});
	}

	delete(id) {
		ApiRestaurantDispatcher.dispatch({
			type: ApiRestaurantActionTypes.DELETE,
			id: id
		});
	}

	fetchAll() {
		ApiRestaurantDispatcher.dispatch({
			type: ApiRestaurantActionTypes.FETCH_ALL
		});
	}

	show(id) {
		ApiRestaurantDispatcher.dispatch({
			type: ApiRestaurantActionTypes.SHOW,
			id: id
		});
	}

	update(id, data) {
		ApiRestaurantDispatcher.dispatch({
			type: ApiRestaurantActionTypes.UPDATE,
			id: id,
			restaurant: data
		});
	}
}

export default new RestaurantActions();
