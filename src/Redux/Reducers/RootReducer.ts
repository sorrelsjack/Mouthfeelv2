import { combineReducers } from 'redux';
import { Flavors } from './FlavorsReducer';
import { Foods } from './FoodsReducer';
import { Textures } from './TexturesReducer';
import { Miscellaneous } from './MiscellaneousReducer';
import { Actions } from '../../Redux/Actions';
import { MouthfeelState, ReduxAction } from '../Models';

export const appReducer = combineReducers({
    flavors: Flavors,
    foods: Foods,
    textures: Textures,
    miscellaneous: Miscellaneous
});

export const rootReducer = (state: MouthfeelState | undefined, action: ReduxAction) => {
    if (action.type === Actions.Logout) // TODO: Create logout action
        state = undefined;

    return appReducer(state, action);
}