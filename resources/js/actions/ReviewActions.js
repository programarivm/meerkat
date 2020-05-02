import ReviewActionTypes from '@/constants/ReviewActionTypes';
import ReviewDispatcher from '@/dispatcher/ReviewDispatcher';

class ReviewActions {
	clickReviewNow() {
		ReviewDispatcher.dispatch({
			type: ReviewActionTypes.CLICK_REVIEW_NOW
		});
	}
}

export default new ReviewActions();
