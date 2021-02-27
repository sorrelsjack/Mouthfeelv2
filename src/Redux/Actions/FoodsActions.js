import { Actions } from '../Actions';
import axios from 'axios';
import { Urls } from '../../Common';

export const SetSelectedFood = (id) => {
    return async dispatch => {
        dispatch({ type: Actions.SetSelectedFood, data: id });
    }
}

export const GetAllFoodsAction = () => {
    return async dispatch => {
        try {
            dispatch({ type: Actions.GetAllFoodsLoading });
            const foods = await axios.get(Urls.foods.getAllFoods());
            dispatch({ type: Actions.GetAllFoodsSuccess, data: foods });
        }
        catch (error) {
            dispatch({ type: Actions.GetAllFoodsFailed, data: error });
        }
    }
}

export const GetFoodDetailsAction = (id) => {
    return async dispatch => {
        try {
            axios.defaults.headers.common['Accept'] = 'application/json';
            axios.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
            dispatch({ type: Actions.GetFoodDetailsLoading });
            const food = await axios.get(Urls.foods.getFoodDetails(id));
            dispatch({ type: Actions.GetFoodDetailsSuccess, data: food });
        }
        catch (error) {
            dispatch({ type: Actions.GetFoodDetailsFailed, data: error })
        }
    }
}