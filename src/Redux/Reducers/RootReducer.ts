import { combineReducers } from 'redux';
import { Flavors } from './FlavorsReducer';
import { Foods } from './FoodsReducer';
import { Textures } from './TexturesReducer';
import { Miscellaneous } from './MiscellaneousReducer';
import { User } from './UserReducer';
import { Comments } from './CommentsReducer';
import { Actions } from '../../Redux/Actions';
import { MouthfeelState, ReduxAction } from '../Models';

export const appReducer = combineReducers({
    comments: Comments,
    flavors: Flavors,
    foods: Foods,
    textures: Textures,
    miscellaneous: Miscellaneous,
    user: User
});

export const rootReducer = (state: MouthfeelState | undefined, action: ReduxAction) => {
    return appReducer(action.type === Actions.User.Logout ? undefined : state, action);
}