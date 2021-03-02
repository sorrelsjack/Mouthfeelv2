import { combineReducers } from 'redux';
import { Flavors } from './FlavorsReducer';
import { Foods } from './FoodsReducer';
import { Textures } from './TexturesReducer';
import { Miscellaneous } from './MiscellaneousReducer';

export const RootReducer = combineReducers({
    flavors: Flavors,
    foods: Foods,
    textures: Textures,
    miscellaneous: Miscellaneous
});