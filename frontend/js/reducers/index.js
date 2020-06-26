import { combineReducers } from 'redux';

import tithe from './tithe';
import credit_card from './credit_card';

export default combineReducers({
    tithe,
    credit_card
});