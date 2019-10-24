import ReviewDispatcher from "../dispatcher/ReviewDispatcher.js";
import ReviewActionTypes from '../constants/ReviewActionTypes';

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

	clickReviewNow() {
		ReviewDispatcher.dispatch({
			type: ReviewActionTypes.CLICK_REVIEW_NOW
		});
	}
}

export default new ReviewActions();
