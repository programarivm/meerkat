import ApiReviewActionTypes from '../../constants/api/ReviewActionTypes';
import ApiReviewDispatcher from "../../dispatcher/api/ReviewDispatcher.js";

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
