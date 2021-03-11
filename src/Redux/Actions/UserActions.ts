import { Actions } from '.';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Urls, SaveJwt } from '../../Common';
import { AuthenticateUserResponse } from '../Models';

// TODO: Get this to be how it's supposed to
// TODO: Store JWT
export const RegisterUserAction = () => {
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

export const AuthenticateUserAction = (username: string, password: string) => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: Actions.Login.Loading });
        try {

            const request = {
                'username': username,
                'password': password
            }

            const res: AuthenticateUserResponse = await axios.post(Urls.users.authenticate(), request);
            await SaveJwt(res.token);
            dispatch({ type: Actions.Login.Success, data: res })
        }
        catch (error) {
            console.log(error)
            dispatch({ type: Actions.Login.Failed })
        }
    }
}

// TODO: Logout action here?