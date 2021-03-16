import { Actions } from '../Actions';
import { UserState, ReduxAction } from '../Models';

export const User = (state: UserState = new UserState(), action: ReduxAction) => {
    switch (action.type) {
        case Actions.User.Register.Loading:
            return { ...state, createNewUser: state.createNewUser.startLoading() }
        case Actions.User.Register.Success:
            return { ...state, createNewUser: state.createNewUser.succeeded() }
        case Actions.User.Register.Failed:
            return { ...state, createNewUser: state.createNewUser.failed(action.error?.response?.data) }

        case Actions.User.Login.Loading:
            return { ...state, profile: state.profile.startLoading() }
        case Actions.User.Login.Success:
            return { ...state, profile: state.profile.succeeded(action.data.data) }
        case Actions.User.Login.Failed: 
            return { ...state, profile: state.profile.failed(action.error?.response?.data) }
        
        case Actions.User.GetCurrent:
            return {
                ...state,
                profile: {
                    loading: false,
                    data: action.data
                }
            }
        default:
            return state;
    }
}