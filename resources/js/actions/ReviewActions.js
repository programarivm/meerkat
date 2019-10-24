import ReviewDispatcher from "../dispatcher/ReviewDispatcher.js";
import ReviewActionTypes from '../constants/ReviewActionTypes';

class ReviewActions {
	clickReviewNow() {
		ReviewDispatcher.dispatch({
			type: ReviewActionTypes.CLICK_REVIEW_NOW
		});
	}
}

export default new ReviewActions();
