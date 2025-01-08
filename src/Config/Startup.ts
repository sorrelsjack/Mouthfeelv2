import axios from 'axios';
import { RemoveUserProfile, RetrieveJwt, Routes, Urls, JwtIsValid } from '../Common';
import { navigate } from '../Config';
import { Actions } from '../Redux/Actions';
import store from '../Redux/ConfigureStore';
import Toast from 'react-native-simple-toast';

export const Startup = () => {
    const deauthenticate = async () => {
        await RemoveUserProfile();
        store.dispatch({ type: Actions.User.Logout, data: null, error: null });
        navigate(Routes.Login);
        Toast.show('Logged out due to token expiration');
        return Promise.reject();
    }

    axios.defaults.headers.common['Content-Type'] = 'application/json';

    axios.interceptors.request.use(async config => {
        if (config.url === Urls.users.authenticate() || config.url === Urls.users.register()) 
            return config;

        const jwt = await RetrieveJwt();
        console.log(jwt)
        if (jwt) config.headers['Authorization'] = jwt;

        return JwtIsValid(jwt) ? config : deauthenticate();
    });
}