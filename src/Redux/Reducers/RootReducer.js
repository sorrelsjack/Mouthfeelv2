import { combineReducers } from 'redux';
import { Foods } from './FoodsReducer';

export const RootReducer = combineReducers({
    foods: Foods
});