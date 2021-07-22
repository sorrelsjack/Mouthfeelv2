import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticateUserResponse } from '../Redux/Models';

export const AsyncStorageKeys = {
    seenAppIntro: 'seenAppIntro',
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

// TODO: maybe have multiple keys
export const RetrieveSeenIntroStatus = async () => await AsyncStorage.getItem(AsyncStorageKeys.seenAppIntro);

export const SetSeenIntroStatus = async () => await AsyncStorage.setItem(AsyncStorageKeys.seenAppIntro, 'true');