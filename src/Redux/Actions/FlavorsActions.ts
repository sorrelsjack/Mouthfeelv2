import { Actions } from '.';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Urls } from '../../Common';

export const GetAllFlavorsAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.GetAllFlavorsLoading });
            const flavors = await axios.get(Urls.flavors.getAll());
            dispatch({ type: Actions.GetAllFlavorsSuccess, data: flavors });
        }
        catch (error) {
            dispatch({ type: Actions.GetAllFlavorsFailed, data: error });
        }
    }
}