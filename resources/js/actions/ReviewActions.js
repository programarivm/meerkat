import ReviewDispatcher from "../dispatcher/ReviewDispatcher.js";
import ReviewActionTypes from '../constants/ReviewActionTypes';

class ReviewActions {
	fetchAll() {
		ReviewDispatcher.dispatch({
			type: ReviewActionTypes.FETCH_ALL
		});
	}
}

export default new ReviewActions();
