import { Actions } from '.';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Urls } from '../../Common';

export const GetAllTexturesAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.Textures.GetAll.Loading });
            const textures = await axios.get(Urls.textures.getAll());
            dispatch({ type: Actions.Textures.GetAll.Success, data: textures });
        }
        catch (error) {
            dispatch({ type: Actions.Textures.GetAll.Failed, data: error });
        }
    }
}