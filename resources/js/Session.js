import Cookies from 'js-cookie';

const name = 'session';

export default class Session {
	static get() {
		if (Cookies.get(name)) {
	    return JSON.parse(Cookies.get(name));
	  }
		return {
			role: null
		};
	}
}
