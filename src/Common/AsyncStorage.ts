import AsyncStorage from '@react-native-async-storage/async-storage';

export const AsyncStorageKeys = {
    jwt: 'jwt'
}

export const SaveJwt = async (jwt: string) => {
    await AsyncStorage.setItem(AsyncStorageKeys.jwt, `Bearer ${jwt}`);
}

export const RetrieveJwt = async () => {
    return await AsyncStorage.getItem(AsyncStorageKeys.jwt);
}

export const RemoveJwt = async () => {
    await AsyncStorage.removeItem(AsyncStorageKeys.jwt);
}