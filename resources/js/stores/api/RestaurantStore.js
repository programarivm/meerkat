import ApiCrudActionTypes from '@/constants/api/CrudActionTypes';
import ApiRestaurantDispatcher from '@/dispatcher/api/RestaurantDispatcher';
import AbstractCrudStore from '@/stores/api/AbstractCrudStore';

class RestaurantStore extends AbstractCrudStore {
	constructor() {
		super();
		this.endpoint = '/api/restaurants';
		ApiRestaurantDispatcher.register(this.handleActions.bind(this));
	}

	handleActions(action) {
		switch (action.type) {
			case ApiCrudActionTypes.CREATE:
				this.create(action.restaurant);
				break;
			case ApiCrudActionTypes.DELETE:
				this.delete(action.id);
				break;
			case ApiCrudActionTypes.FETCH_ALL:
				this.fetchAll();
				break;
			case ApiCrudActionTypes.SHOW:
				this.show(action.id);
				break;
			case ApiCrudActionTypes.UPDATE:
				this.update(action.id, action.restaurant);
				break;
			default:
        // do nothing
		}
	}
}

export default new RestaurantStore();
