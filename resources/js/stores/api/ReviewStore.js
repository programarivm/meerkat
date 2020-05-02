import ApiCrudActionTypes from '@/constants/api/CrudActionTypes';
import ApiReviewDispatcher from '@/dispatcher/api/ReviewDispatcher';
import AbstractCrudStore from '@/stores/api/AbstractCrudStore';

class ReviewStore extends AbstractCrudStore {
	constructor() {
		super();
		this.endpoint = '/api/reviews';
		ApiReviewDispatcher.register(this.handleActions.bind(this));
	}

	handleActions(action) {
		switch (action.type) {
			case ApiCrudActionTypes.CREATE:
				this.create(action.review);
				break;
			case ApiCrudActionTypes.DELETE:
				this.delete(action.id);
				break;
			case ApiCrudActionTypes.FETCH_ALL:
				this.fetchAll();
				break;
			default:
        // do nothing
		}
	}
}

export default new ReviewStore();
