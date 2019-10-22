import ReviewDispatcher from "../dispatcher/ReviewDispatcher.js";
import ReviewActionTypes from '../constants/ReviewActionTypes';

class ReviewActions {
	results() {
		ReviewDispatcher.dispatch({
			type: ReviewActionTypes.RESULTS
		});
	}
}

export default new ReviewActions();
