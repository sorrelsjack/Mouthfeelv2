import { Actions } from '../Actions';
import { UserState, ReduxAction } from '../Models';

export const User = (state: UserState = new UserState(), action: ReduxAction) => {
    switch (action.type) {
        case Actions.User.Register.Loading:
            return {
                ...state
            }
        case Actions.User.Register.Success:
            return {
                ...state
            }
        case Actions.User.Login.Loading:
            return {
                ...state,
                profile: {
                    loading: true
                }
            }
        case Actions.User.Login.Success:
            return {
                ...state,
                profile: {
                    loading: false,
                    data: action.data.data
                }
            }
        default:
            return state;
    }
}