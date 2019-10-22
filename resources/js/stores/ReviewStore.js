import ReviewActionTypes from '../constants/ReviewActionTypes';
import ReviewDispatcher from "../dispatcher/ReviewDispatcher.js";
import { EventEmitter } from 'events';

class ReviewStore extends EventEmitter {
	constructor() {
		super();
		ReviewDispatcher.register(this.handleActions.bind(this));
	}

	results() {
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

	handleActions(action) {
		switch (action.type) {
			case ReviewActionTypes.RESULTS:
				this.results();
				break;
			default:
        // do nothing
		}
	}
}

export default new ReviewStore();
