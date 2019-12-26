import ApiRestaurantActionTypes from '../../constants/api/RestaurantActionTypes';
import ApiRestaurantDispatcher from "../../dispatcher/api/RestaurantDispatcher.js";
import { EventEmitter } from 'events';

const errorMessage = 'Whoops! Sorry there was an error, please try again later.';

class RestaurantStore extends EventEmitter {
	constructor() {
		super();
		ApiRestaurantDispatcher.register(this.handleActions.bind(this));
	}

	create(data) {
		fetch(process.env.MIX_APP_URL + '/api/restaurants', {
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
				case 422:
					res.json().then((data) => {
						let validation = [];
	          Object.values(data.errors).forEach(value => {
	            value.forEach(message => {
	              validation.push(message);
	            });
	          });
						this.emit("create.422", validation);
					});
					break;
				default:
					this.emit("create.error", [errorMessage]);
					break;
			}
		});
	}

	delete(id) {
		fetch(process.env.MIX_APP_URL + `/api/restaurants/${id}`, {
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
					this.emit("delete.error", [errorMessage]);
					break;
			}
		});
	}

	fetchAll() {
		fetch(process.env.MIX_APP_URL + '/api/restaurants', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			switch (res.status) {
				case 200:
					res.json().then((data) => {
						this.emit("fetch_all.200", data);
					});
					break;
				default:
					this.emit("fetch_all.error", [errorMessage]);
					break;
			}
		});
	}

	show(id) {
		fetch(process.env.MIX_APP_URL + `/api/restaurants/${id}`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			switch (res.status) {
				case 200:
					res.json().then((data) => {
						this.emit("show.200", data);
					});
					break;
				default:
					this.emit("show.error", [errorMessage]);
					break;
			}
		});
	}

	update(id, data) {
		fetch(process.env.MIX_APP_URL + `/api/restaurants/${id}`, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then((res) => {
			switch (res.status) {
				case 200:
					this.emit("update.200");
					break;
				case 422:
					res.json().then((data) => {
						let validation = [];
	          Object.values(data.errors).forEach(value => {
	            value.forEach(message => {
	              validation.push(message);
	            });
	          });
						this.emit("update.422", validation);
					});
					break;
				default:
					this.emit("update.error", [errorMessage]);
					break;
			}
		});
	}

	handleActions(action) {
		switch (action.type) {
			case ApiRestaurantActionTypes.CREATE:
				this.create(action.restaurant);
				break;
			case ApiRestaurantActionTypes.DELETE:
				this.delete(action.id);
				break;
			case ApiRestaurantActionTypes.FETCH_ALL:
				this.fetchAll();
				break;
			case ApiRestaurantActionTypes.SHOW:
				this.show(action.id);
				break;
			case ApiRestaurantActionTypes.UPDATE:
				this.update(action.id, action.restaurant);
				break;
			default:
        // do nothing
		}
	}
}

export default new RestaurantStore();
