import GuiDispatcher from "../dispatcher/GuiDispatcher.js";
import GuiActionTypes from '../constants/GuiActionTypes';

class GuiActions {
	clickReviewNow() {
		GuiDispatcher.dispatch({
			type: GuiActionTypes.CLICK_REVIEW_NOW
		});
	}
}

export default new GuiActions();
