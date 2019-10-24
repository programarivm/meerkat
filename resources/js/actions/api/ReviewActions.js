import ApiReviewDispatcher from "../../dispatcher/api/ReviewDispatcher.js";
import ApiReviewActionTypes from '../../constants/api/ReviewActionTypes';

class ReviewActions {
	doReview(data) {
		ApiReviewDispatcher.dispatch({
			type: ApiReviewActionTypes.DO_REVIEW,
			review: data
		});
	}

	fetchAll() {
		ApiReviewDispatcher.dispatch({
			type: ApiReviewActionTypes.FETCH_ALL
		});
	}
}

export default new ReviewActions();
