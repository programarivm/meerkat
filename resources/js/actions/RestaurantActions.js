import RestaurantDispatcher from "../dispatcher/RestaurantDispatcher.js";
import RestaurantActionTypes from '../constants/RestaurantActionTypes';

class RestaurantActions {
	create(data) {
		RestaurantDispatcher.dispatch({
			type: RestaurantActionTypes.CREATE,
			restaurant: data
		});
	}

	delete(data) {
		RestaurantDispatcher.dispatch({
			type: RestaurantActionTypes.DELETE,
			id: data
		});
	}

	fetchAll() {
		RestaurantDispatcher.dispatch({
			type: RestaurantActionTypes.FETCH_ALL
		});
	}

	show(data) {
		RestaurantDispatcher.dispatch({
			type: RestaurantActionTypes.SHOW,
			id: data
		});
	}

	update(id, data) {
		RestaurantDispatcher.dispatch({
			type: RestaurantActionTypes.UPDATE,
			id: id,
			restaurant: data
		});
	}
}

export default new RestaurantActions();
