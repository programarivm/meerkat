import ApiRestaurantActionTypes from '../../constants/api/RestaurantActionTypes';
import ApiRestaurantDispatcher from "../../dispatcher/api/RestaurantDispatcher.js";
import AbstractCrudStore from "./AbstractCrudStore.js";

class RestaurantStore extends AbstractCrudStore {
	constructor() {
		super();
		this.endpoint = '/api/restaurants';
		ApiRestaurantDispatcher.register(this.handleActions.bind(this));
	}

	handleActions(action) {
		switch (action.type) {
			case ApiRestaurantActionTypes.CREATE:
				this.create(action.restaurant);
				break;
			case ApiRestaurantActionTypes.DELETE:
				this.delete(action.id);
				break;
			case ApiRestaurantActionTypes.FETCH_ALL:
				this.fetchAll();
				break;
			case ApiRestaurantActionTypes.SHOW:
				this.show(action.id);
				break;
			case ApiRestaurantActionTypes.UPDATE:
				this.update(action.id, action.restaurant);
				break;
			default:
        // do nothing
		}
	}
}

export default new RestaurantStore();
