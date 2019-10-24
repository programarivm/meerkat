import ReviewActionTypes from '../constants/ReviewActionTypes';
import ReviewDispatcher from "../dispatcher/ReviewDispatcher.js";

class ReviewActions {
	clickReviewNow() {
		ReviewDispatcher.dispatch({
			type: ReviewActionTypes.CLICK_REVIEW_NOW
		});
	}
}

export default new ReviewActions();
