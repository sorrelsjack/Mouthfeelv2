import { Actions } from '../Actions';
import { UserState, ReduxAction } from '../Models';

export const User = (state: UserState = new UserState(), action: ReduxAction) => {
    switch (action.type) {
        case Actions.Register.Loading:
            return {
                ...state
            }
        case Actions.Register.Success:
            return {
                ...state
            }
        case Actions.Login.Loading:
            return {
                ...state
            }
        case Actions.Login.Success:
            return {
                ...state
            }
        default:
            return state;
    }
}