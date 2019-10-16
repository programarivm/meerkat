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
}

export default new RestaurantActions();
