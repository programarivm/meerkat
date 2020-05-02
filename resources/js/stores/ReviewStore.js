import ReviewActionTypes from '@/constants/ReviewActionTypes';
import ReviewDispatcher from '@/dispatcher/ReviewDispatcher';
import { EventEmitter } from 'events';

class ReviewStore extends EventEmitter {
	constructor() {
		super();
		ReviewDispatcher.register(this.handleActions.bind(this));
	}

	clickReviewNow() {
		this.emit("click.review_now");
	}

	handleActions(action) {
		switch (action.type) {
			case ReviewActionTypes.CLICK_REVIEW_NOW:
				this.clickReviewNow();
				break;
			default:
        // do nothing
		}
	}
}

export default new ReviewStore();
