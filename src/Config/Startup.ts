import axios from 'axios';
import { RemoveUserProfile, RetrieveJwt, Routes, Urls, JwtIsValid } from '../Common';
import { navigate } from '../Config';

// TODO: Method to refresh JWT
// TODO: Add a message for if a user gets logged out
export const Startup = () => {
    const deauthenticate = async () => {
        // TODO: This almost works. But we have the user info still in the store... so it just throws you back onto the home screen. Fix that
        await RemoveUserProfile();
        navigate(Routes.Login);
        return Promise.reject();
    }

    axios.defaults.headers.common['Content-Type'] = 'application/json';

    axios.interceptors.request.use(async config => {
        if (config.url === Urls.users.authenticate() || config.url === Urls.users.register()) 
            return config;

        // TODO: Can we dispatch this to redux?
        // TODO: Endpoint to fetch user info
        const jwt = await RetrieveJwt();
        if (jwt) config.headers['Authorization'] = jwt;

        return JwtIsValid(jwt) ? config : deauthenticate();
    });
}