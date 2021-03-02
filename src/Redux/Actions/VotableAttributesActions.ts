import { Actions } from '.';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Urls } from '../../Common';
import { GetAllFlavorsAction, GetAllMiscellaneousAction, GetAllTexturesAction } from '.';

export const GetAllVotableAttributesAction = () => {
    return async (dispatch: Dispatch) => {
        dispatch(GetAllFlavorsAction());
        dispatch(GetAllMiscellaneousAction());
        dispatch(GetAllTexturesAction());
    }
}