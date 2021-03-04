import { Actions } from '.';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Urls } from '../../Common';

export const SetSelectedFood = (id: number) => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: Actions.SetSelectedFood, data: id });
    }
}

export const GetAllFoodsAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.GetAllFoodsLoading });
            const foods = await axios.get(Urls.foods.getAll());
            dispatch({ type: Actions.GetAllFoodsSuccess, data: foods });
        }
        catch (error) {
            dispatch({ type: Actions.GetAllFoodsFailed, data: error });
        }
    }
}

export const GetFoodDetailsAction = (id: number) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.GetFoodDetailsLoading });
            const food = await axios.get(Urls.foods.getDetails(id));
            dispatch({ type: Actions.GetFoodDetailsSuccess, data: food });
        }
        catch (error) {
            dispatch({ type: Actions.GetFoodDetailsFailed, data: error })
        }
    }
}

export const SearchFoodsAction = (query: string, filter?: string[]) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.SearchFoodsLoading });
            const food = await axios.get(Urls.foods.search(query, filter));
            dispatch({ type: Actions.SearchFoodsSuccess, data: food });
        }
        catch (error) {
            dispatch({ type: Actions.SearchFoodsFailed, data: error })
        }
    }
}