import ApiReviewActionTypes from '../../constants/api/ReviewActionTypes';
import ApiReviewDispatcher from "../../dispatcher/api/ReviewDispatcher.js";

class ReviewActions {
	create(data) {
		ApiReviewDispatcher.dispatch({
			type: ApiReviewActionTypes.CREATE,
			review: data
		});
	}

	delete(id) {
		ApiReviewDispatcher.dispatch({
			type: ApiReviewActionTypes.DELETE,
			id: id
		});
	}

	fetchAll() {
		ApiReviewDispatcher.dispatch({
			type: ApiReviewActionTypes.FETCH_ALL
		});
	}
}

export default new ReviewActions();
