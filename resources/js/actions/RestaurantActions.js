import RestaurantDispatcher from "../dispatcher/RestaurantDispatcher.js";
import RestaurantActionTypes from '../constants/RestaurantActionTypes';

class RestaurantActions {
	create(data) {
		RestaurantDispatcher.dispatch({
			type: RestaurantActionTypes.CREATE,
			restaurant: data
		});
	}

	delete(id) {
		RestaurantDispatcher.dispatch({
			type: RestaurantActionTypes.DELETE,
			id: id
		});
	}

	fetchAll() {
		RestaurantDispatcher.dispatch({
			type: RestaurantActionTypes.FETCH_ALL
		});
	}

	show(id) {
		RestaurantDispatcher.dispatch({
			type: RestaurantActionTypes.SHOW,
			id: id
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
