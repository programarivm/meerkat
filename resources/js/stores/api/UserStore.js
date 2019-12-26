import ApiUserActionTypes from '../../constants/api/UserActionTypes';
import ApiUserDispatcher from "../../dispatcher/api/UserDispatcher.js";
import AbstractCrudStore from "./AbstractCrudStore.js";

class UserStore extends AbstractCrudStore {
	constructor() {
		super();
		this.endpoint = '/api/users';
		ApiUserDispatcher.register(this.handleActions.bind(this));
	}

	handleActions(action) {
		switch (action.type) {
			case ApiUserActionTypes.CREATE:
				this.create(action.user);
				break;
			case ApiUserActionTypes.DELETE:
				this.delete(action.id);
				break;
			case ApiUserActionTypes.FETCH_ALL:
				this.fetchAll();
				break;
			case ApiUserActionTypes.SHOW:
				this.show(action.id);
				break;
			case ApiUserActionTypes.UPDATE:
				this.update(action.id, action.user);
				break;
			default:
        // do nothing
		}
	}
}

export default new UserStore();
