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
                ...state,
                profile: {
                    loading: true
                }
            }
        case Actions.Login.Success:
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