import axios from 'axios';
import { RemoveJwt, RetrieveJwt, Routes, Urls } from '../Common';
import JwtDecode from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';

export const Startup = () => {
    const deauthenticate = async () => {
        // TODO: Error gets thrown and I'm pretty sure it's because of the navigation stuff. Fix it
        await RemoveJwt();
        const navigation = useNavigation();
        navigation.navigate(Routes.Login);
        return Promise.reject();
    }

    axios.defaults.headers.common['Content-Type'] = 'application/json';

    axios.interceptors.request.use(async config => {
        if (config.url === Urls.users.authenticate() || config.url === Urls.users.register()) 
            return config;

        const jwt = await RetrieveJwt();
        const currentTime = (new Date()).getTime() / 1000;
        const expiration = jwt ? JwtDecode(jwt).exp : 0;
        const expired = expiration <= currentTime;
        const authenticated = !expired && !!jwt;
        if (jwt) config.headers['Authorization'] = jwt;

        return authenticated ? config : deauthenticate();
    });
}