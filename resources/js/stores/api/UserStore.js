import ApiCrudActionTypes from '../../constants/api/CrudActionTypes';
import ApiUserDispatcher from '../../dispatcher/api/UserDispatcher';
import AbstractCrudStore from './AbstractCrudStore';

class UserStore extends AbstractCrudStore {
	constructor() {
		super();
		this.endpoint = '/api/users';
		ApiUserDispatcher.register(this.handleActions.bind(this));
	}

	handleActions(action) {
		switch (action.type) {
			case ApiCrudActionTypes.CREATE:
				this.create(action.user);
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
				this.update(action.id, action.user);
				break;
			default:
        // do nothing
		}
	}
}

export default new UserStore();
