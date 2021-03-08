import { Actions } from '.';
import axios from 'axios';
import { Dispatch } from 'redux';
import { Urls } from '../../Common';

export const SetSelectedFoodAction = (id: number) => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: Actions.SetSelectedFood, data: id });
    }
}

export const GetAllFoodsAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.GetAllFoods.Loading });
            const foods = await axios.get(Urls.foods.getAll());
            dispatch({ type: Actions.GetAllFoods.Success, data: foods });
        }
        catch (error) {
            dispatch({ type: Actions.GetAllFoods.Failed, data: error });
        }
    }
}

export const GetLikedFoodsAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.GetLikedFoods.Loading });
            const liked = await axios.get(Urls.foods.liked());
            dispatch({ type: Actions.GetLikedFoods.Success, data: liked });
        }
        catch (error) {
            dispatch({ type: Actions.GetLikedFoods.Failed, data: error })
        }
    }
}

export const GetDislikedFoodsAction = () => {
    return async (dispatch: Dispatch) => {
        try {

        }
        catch (error) {

        }
    }
}

export const GetFoodDetailsAction = (id: number) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.GetFoodDetails.Loading });
            const food = await axios.get(Urls.foods.getDetails(id));
            dispatch({ type: Actions.GetFoodDetails.Success, data: food });
        }
        catch (error) {
            dispatch({ type: Actions.GetFoodDetails.Failed, data: error })
        }
    }
}

export const SearchFoodsAction = (query: string, filter?: string[]) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.SearchFoods.Loading });
            const food = await axios.get(Urls.foods.search(query, filter));
            dispatch({ type: Actions.SearchFoods.Success, data: food });
        }
        catch (error) {
            dispatch({ type: Actions.SearchFoods.Failed, data: error })
        }
    }
}