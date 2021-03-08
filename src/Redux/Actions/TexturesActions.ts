import { Actions } from '.';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Urls } from '../../Common';

export const GetAllTexturesAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.GetAllTextures.Loading });
            const textures = await axios.get(Urls.textures.getAll());
            dispatch({ type: Actions.GetAllTextures.Success, data: textures });
        }
        catch (error) {
            dispatch({ type: Actions.GetAllTextures.Failed, data: error });
        }
    }
}