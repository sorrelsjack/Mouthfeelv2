import { VotableAttribute } from './VotableAttribute';
import { AuthenticateUserResponse } from './AuthenticateUserResponse';

// TODO: Get this the way it's supposed to be
export class UserState {
    // register
    profile: {
        data: AuthenticateUserResponse | null,
        loading: boolean
    };

    constructor () {
        this.profile = {
            data: null,
            loading: false
        }
    }
}