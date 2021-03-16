import { VotableAttribute } from './VotableAttribute';
import { AuthenticateUserResponse } from './AuthenticateUserResponse';
import { ApiError, ApiData, ApiOperation } from '.';

export class UserState {
    createNewUser: ApiOperation;
    profile: ApiData<AuthenticateUserResponse> 

    constructor () {
        this.createNewUser = new ApiOperation();
        this.profile = new ApiData();
    }
}