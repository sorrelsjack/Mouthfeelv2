import { Actions } from '.';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Urls, SaveUserProfile, RemoveUserProfile } from '../../Common';
import { AuthenticateUserResponse } from '../Models';

// TODO: Get this to be how it's supposed to
export const RegisterUserAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.User.Register.Loading });
            const res = await axios.post(Urls.users.register());
            dispatch({ type: Actions.User.Register.Success, data: res });
        }
        catch (error) {
            dispatch({ type: Actions.User.Register.Failed, data: error });
        }
    }
}

export const AuthenticateUserAction = (username: string, password: string) => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: Actions.User.Login.Loading });
        try {

            const request = {
                'username': username,
                'password': password
            }

            const res = await axios.post(Urls.users.authenticate(), request);
            const data: AuthenticateUserResponse = res.data;
            await SaveUserProfile(data);
            dispatch({ type: Actions.User.Login.Success, data: res })
        }
        catch (error) {
            console.log(error)
            dispatch({ type: Actions.User.Login.Failed })
        }
    }
}

export const LogoutAction = () => {
    return async (dispatch: Dispatch) => {
        await RemoveUserProfile();
        dispatch({ type: Actions.User.Logout })
    }
}