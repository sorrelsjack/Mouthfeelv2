import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticateUserResponse } from '../Redux/Models';

export const AsyncStorageKeys = {
    userProfile: 'userProfile',
    jwt: 'jwt'
}

export const SaveUserProfile = async (userProfile: AuthenticateUserResponse) => {
    userProfile.token = `Bearer ${userProfile.token}`;
    const json = JSON.stringify(userProfile);
    await AsyncStorage.setItem(AsyncStorageKeys.userProfile, json);
}

export const RetrieveUserProfile = async () => {
    const json = await AsyncStorage.getItem(AsyncStorageKeys.userProfile);
    return json ? JSON.parse(json) : null;
}

export const RemoveUserProfile = async () => {
    await AsyncStorage.removeItem(AsyncStorageKeys.userProfile);
}

export const RetrieveJwt = async () => {
    return (await RetrieveUserProfile())?.token;
}