import RestaurantDispatcher from "../../dispatcher/api/RestaurantDispatcher.js";
import RestaurantActionTypes from '../../constants/api/RestaurantActionTypes';

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
