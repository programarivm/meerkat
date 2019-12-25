import ApiReviewActionTypes from '../../constants/api/ReviewActionTypes';
import ApiReviewDispatcher from "../../dispatcher/api/ReviewDispatcher.js";
import { EventEmitter } from 'events';

class ReviewStore extends EventEmitter {
	constructor() {
		super();
		ApiReviewDispatcher.register(this.handleActions.bind(this));
	}

	create(data) {
		fetch(process.env.MIX_APP_URL + '/api/reviews', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then((res) => {
			switch (res.status) {
				case 201:
					this.emit("create.201");
					break;
				default:
					this.emit("create.error");
					break;
			}
		});
	}

	delete(id) {
		fetch(process.env.MIX_APP_URL + `/api/reviews/${id}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			switch (res.status) {
				case 204:
					this.emit("delete.204");
					break;
				default:
					this.emit("delete.error");
					break;
			}
		});
	}

	fetchAll() {
		fetch(process.env.MIX_APP_URL + '/api/reviews', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
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
			case ApiReviewActionTypes.CREATE:
				this.create(action.review);
				break;
			case ApiReviewActionTypes.DELETE:
				this.delete(action.id);
				break;
			case ApiReviewActionTypes.FETCH_ALL:
				this.fetchAll();
				break;
			default:
        // do nothing
		}
	}
}

export default new ReviewStore();
