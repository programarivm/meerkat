import ReviewActionTypes from '../constants/ReviewActionTypes';
import ReviewDispatcher from "../dispatcher/ReviewDispatcher.js";
import { EventEmitter } from 'events';

class ReviewStore extends EventEmitter {
	constructor() {
		super();
		ReviewDispatcher.register(this.handleActions.bind(this));
	}

	doReview(data) {
		fetch(process.env.MIX_APP_URL + '/api/do-review', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then((res) => {
			switch (res.status) {
				case 201:
					this.emit("do_review.201");
					break;
				default:
					this.emit("do_review.error");
					break;
			}
		});
	}

	fetchAll() {
		fetch(process.env.MIX_APP_URL + '/api/reviews', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			if (res.status !== 200) throw new Error(res.status);
			else return res.json();
		})
		.then((data) => {
			this.emit("fetch_all.200", data);
		})
		.catch((error) => {
			this.emit("fetch_all.error");
		});
	}

	clickReviewNow() {
		this.emit("click.review_now");
	}

	handleActions(action) {
		switch (action.type) {
			case ReviewActionTypes.DO_REVIEW:
				this.doReview();
				break;
			case ReviewActionTypes.FETCH_ALL:
				this.fetchAll();
				break;
			case ReviewActionTypes.CLICK_REVIEW_NOW:
				this.clickReviewNow();
				break;
			default:
        // do nothing
		}
	}
}

export default new ReviewStore();
