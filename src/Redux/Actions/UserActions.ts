import { Actions } from '.';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Urls } from '../../Common';

// TODO: Get this to be how it's supposed to
// TODO: Store JWT
export const RegisterUser = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.Register.Loading });
            const res = await axios.post(Urls.users.register());
            dispatch({ type: Actions.Register.Success, data: res });
        }
        catch (error) {
            dispatch({ type: Actions.Register.Failed, data: error });
        }
    }
}

export const AuthenticateUser = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.Login.Loading });
            const res = await axios.post(Urls.users.authenticate());
            dispatch({ type: Actions.Login.Success, data: res })
        }
        catch (error) {
            dispatch({ type: Actions.Login.Failed })
        }
    }
}

// TODO: Logout action here?