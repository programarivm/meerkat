import RestaurantActionTypes from '../constants/RestaurantActionTypes';
import RestaurantDispatcher from "../dispatcher/RestaurantDispatcher.js";
import { EventEmitter } from 'events';

class RestaurantStore extends EventEmitter {
	constructor() {
		super();
		RestaurantDispatcher.register(this.handleActions.bind(this));
	}

	create(data) {
		fetch(process.env.MIX_APP_URL + '/api/restaurants', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then((res) => {
			switch (res.status) {
				case 201:
					this.emit("restaurant_create_201");
					break;
				default:
					this.emit("restaurant_create_error");
					break;
			}
		});
	}

	delete(id) {
		fetch(process.env.MIX_APP_URL + `/api/restaurants/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			switch (res.status) {
				case 204:
					this.emit("restaurant_delete_204");
					break;
				default:
					this.emit("restaurant_delete_error");
					break;
			}
		});
	}

	fetchAll() {
		fetch(process.env.MIX_APP_URL + '/api/restaurants', {
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
			this.emit("restaurant_fetch_all_200", data);
		})
		.catch((error) => {
			this.emit("restaurant_fetch_all_error");
		});
	}

	update(data) {
		fetch(process.env.MIX_APP_URL + '/api/restaurants', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then((res) => {
			switch (res.status) {
				case 200:
					this.emit("restaurant_update_200");
					break;
				default:
					this.emit("restaurant_update_error");
					break;
			}
		});
	}

	handleActions(action) {
		switch (action.type) {
			case RestaurantActionTypes.CREATE:
				this.create(action.restaurant);
				break;
			case RestaurantActionTypes.DELETE:
				this.delete(action.id);
				break;
			case RestaurantActionTypes.FETCH_ALL:
				this.fetchAll();
				break;
			case RestaurantActionTypes.UPDATE:
				this.update(action.restaurant);
				break;
			default:
        // do nothing
		}
	}
}

export default new RestaurantStore();
