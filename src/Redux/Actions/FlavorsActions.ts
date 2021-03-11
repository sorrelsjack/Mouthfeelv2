import { Actions } from '.';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Urls } from '../../Common';

export const GetAllFlavorsAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.Flavors.GetAll.Loading });
            const flavors = await axios.get(Urls.flavors.getAll());
            dispatch({ type: Actions.Flavors.GetAll.Success, data: flavors });
        }
        catch (error) {
            dispatch({ type: Actions.Flavors.GetAll.Failed, data: error });
        }
    }
}