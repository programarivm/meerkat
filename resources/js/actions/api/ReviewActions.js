import ReviewDispatcher from "../../dispatcher/api/ReviewDispatcher.js";
import ReviewActionTypes from '../../constants/api/ReviewActionTypes';

class ReviewActions {
	doReview(data) {
		ReviewDispatcher.dispatch({
			type: ReviewActionTypes.DO_REVIEW,
			review: data
		});
	}

	fetchAll() {
		ReviewDispatcher.dispatch({
			type: ReviewActionTypes.FETCH_ALL
		});
	}
}

export default new ReviewActions();
