import ApiReviewActionTypes from '../../constants/api/ReviewActionTypes';
import ApiReviewDispatcher from "../../dispatcher/api/ReviewDispatcher.js";
import AbstractCrudStore from "./AbstractCrudStore.js";

class ReviewStore extends AbstractCrudStore {
	constructor() {
		super();
		this.endpoint = '/api/reviews';
		ApiReviewDispatcher.register(this.handleActions.bind(this));
	}

	handleActions(action) {
		switch (action.type) {
			case ApiReviewActionTypes.CREATE:
				this.create(action.review);
				break;
			case ApiReviewActionTypes.DELETE:
				this.delete(action.id);
				break;
			case ApiReviewActionTypes.FETCH_ALL:
				this.fetchAll();
				break;
			default:
        // do nothing
		}
	}
}

export default new ReviewStore();
