import { Actions } from '.';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Urls } from '../../Common';

export const GetAllMiscellaneousAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.Miscellaneous.GetAll.Loading });
            const misc = await axios.get(Urls.misc.getAll());
            dispatch({ type: Actions.Miscellaneous.GetAll.Success, data: misc });
        }
        catch (error) {
            dispatch({ type: Actions.Miscellaneous.GetAll.Failed, data: error });
        }
    }
}