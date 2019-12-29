import { EventEmitter } from 'events';

const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json'
};

const messages = {
	error: 'Whoops! Sorry there was an error, please try again later.'
};

export default class AbstractCrudStore extends EventEmitter {

	_niceValidation(errors) {
		let messages = [];
		Object.values(errors).forEach(error => {
			error.forEach(message => {
				messages.push(message);
			});
		});
		return messages;
	}

	create(data) {
		fetch(process.env.MIX_APP_URL + this.endpoint, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(data)
		})
		.then((res) => {
			switch (res.status) {
				case 201:
					this.emit("create.201");
					break;
				case 422:
					res.json().then((data) => {
						this.emit("create.422", this._niceValidation(data.errors));
					});
					break;
				default:
					this.emit("create.error", [messages.error]);
					break;
			}
		});
	}

	delete(id) {
		fetch(process.env.MIX_APP_URL + this.endpoint + `/${id}`, {
			method: 'DELETE',
			headers: headers
		})
		.then((res) => {
			switch (res.status) {
				case 204:
					this.emit("delete.204");
					break;
				default:
					this.emit("delete.error", [messages.error]);
					break;
			}
		});
	}

	fetchAll() {
		fetch(process.env.MIX_APP_URL + this.endpoint, {
			method: 'GET',
			headers: headers
		})
		.then((res) => {
			switch (res.status) {
				case 200:
					res.json().then((data) => {
						this.emit("fetch_all.200", data);
					});
					break;
				default:
					this.emit("fetch_all.error", [messages.error]);
					break;
			}
		});
	}

	show(id) {
		fetch(process.env.MIX_APP_URL + this.endpoint + `/${id}`, {
			method: 'GET',
			headers: headers
		})
		.then((res) => {
			switch (res.status) {
				case 200:
					res.json().then((data) => {
						this.emit("show.200", data);
					});
					break;
				default:
					this.emit("show.error", [messages.error]);
					break;
			}
		});
	}

	update(id, data) {
		fetch(process.env.MIX_APP_URL + this.endpoint + `/${id}`, {
			method: 'PUT',
			headers: headers,
			body: JSON.stringify(data)
		})
		.then((res) => {
			switch (res.status) {
				case 200:
					this.emit("update.200");
					break;
				case 422:
					res.json().then((data) => {
						this.emit("update.422", this._niceValidation(data.errors));
					});
					break;
				default:
					this.emit("update.error", [messages.error]);
					break;
			}
		});
	}
}
