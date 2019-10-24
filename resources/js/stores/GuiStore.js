import GuiActionTypes from '../constants/GuiActionTypes';
import GuiDispatcher from "../dispatcher/GuiDispatcher.js";
import { EventEmitter } from 'events';

class GuiStore extends EventEmitter {
	clickReviewNow() {
		this.emit("click.review_now");
	}

	handleActions(action) {
		switch (action.type) {
			case GuiActionTypes.CLICK_REVIEW_NOW:
				this.clickReviewNow();
				break;
			default:
        // do nothing
		}
	}
}

export default new GuiStore();
