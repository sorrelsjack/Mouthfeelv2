import { VotableAttribute } from './VotableAttribute';
import { AuthenticateUserResponse } from './AuthenticateUserResponse';

export class UserState {
    newUser: {
        loading: false
    };
    profile: {
        data: AuthenticateUserResponse | null,
        loading: boolean
    };

    constructor () {
        this.newUser = {
            loading: false
        } 
        this.profile = {
            data: null,
            loading: false
        }
    }
}