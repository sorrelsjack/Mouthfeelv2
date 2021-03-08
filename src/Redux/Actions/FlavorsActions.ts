import { Actions } from '.';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Urls } from '../../Common';

export const GetAllFlavorsAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.GetAllFlavors.Loading });
            const flavors = await axios.get(Urls.flavors.getAll());
            dispatch({ type: Actions.GetAllFlavors.Success, data: flavors });
        }
        catch (error) {
            dispatch({ type: Actions.GetAllFlavors.Failed, data: error });
        }
    }
}