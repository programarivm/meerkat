import ApiCrudActionTypes from '../../constants/api/CrudActionTypes';
import ApiReviewDispatcher from "../../dispatcher/api/ReviewDispatcher.js";

class ReviewActions {
	create(data) {
		ApiReviewDispatcher.dispatch({
			type: ApiCrudActionTypes.CREATE,
			review: data
		});
	}

	delete(id) {
		ApiReviewDispatcher.dispatch({
			type: ApiCrudActionTypes.DELETE,
			id: id
		});
	}

	fetchAll() {
		ApiReviewDispatcher.dispatch({
			type: ApiCrudActionTypes.FETCH_ALL
		});
	}
}

export default new ReviewActions();
