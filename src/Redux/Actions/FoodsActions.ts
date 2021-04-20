import { Actions } from '.';
import axios from 'axios';
import { Dispatch, } from 'redux';
import { Urls } from '../../Common';
import { AddOrUpdateAttributeRequest, FoodDetails, MouthfeelState } from '../Models';
import { AttributeType } from '../../Models';

export const SetSelectedFoodAction = (food: FoodDetails) => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: Actions.SetSelectedFood, data: food });
    }
}

export const CreateFoodAction = () => {

}

export const GetLikedFoodsAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.GetLikedFoods.Loading });
            const liked = await axios.get(Urls.foods.liked());
            dispatch({ type: Actions.GetLikedFoods.Success, data: liked });
        }
        catch (error) {
            dispatch({ type: Actions.GetLikedFoods.Failed, error })
        }
    }
}

export const GetDislikedFoodsAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.GetDislikedFoods.Loading });
            const disliked = await axios.get(Urls.foods.disliked());
            dispatch({ type: Actions.GetDislikedFoods.Success, data: disliked });
        }
        catch (error) {
            dispatch({ type: Actions.GetDislikedFoods.Failed, error })
        }
    }
}

export const ManageFoodSentimentAction = (foodId: number, sentiment: number) => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: Actions.ManageFoodSentiment.Loading });
        try {
            await axios.post(Urls.foods.sentiment(), { foodId, sentiment });
            dispatch({ type: Actions.ManageFoodSentiment.Success });
        }
        catch (error) {
            dispatch({ type: Actions.ManageFoodSentiment.Failed, error })
        }
    }
}

export const GetRecommendedFoodsAction = () => {

}

export const GetFoodsToTryAction = () => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: Actions.GetFoodsToTry.Loading })
        try {
            const toTry = await axios.get(Urls.foods.toTry());
            dispatch({ type: Actions.GetFoodsToTry.Success, data: toTry });
        }
        catch (error) {
            dispatch({ type: Actions.GetFoodsToTry.Failed, error });
        }
    }
}

export const AddOrRemoveFoodToTryAction = (foodId: number) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.AddOrRemoveFoodToTry.Loading })
            await axios.post(Urls.foods.toTry(), { foodId })
            dispatch({ type: Actions.AddOrRemoveFoodToTry.Success })
        }
        catch (error) {
            dispatch({ type: Actions.AddOrRemoveFoodToTry.Failed, error })
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
            dispatch({ type: Actions.GetFoodDetails.Failed, error })
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
            dispatch({ type: Actions.SearchFoods.Failed, error })
        }
    }
}

export const ClearSearchAction = () => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: Actions.ClearSearch });
    }
}

export const AddOrUpdateAttributeAction = (attributeType: AttributeType, request: AddOrUpdateAttributeRequest) => {
    return async (dispatch: Dispatch) => {

        let url = '';
        switch (attributeType) {
            case 'flavor':
                url = Urls.foods.flavors(request.foodId);
                break;
            case 'miscellaneous':
                url = Urls.foods.misc(request.foodId);
                break;
            case 'texture':
                url = Urls.foods.textures(request.foodId);
                break;
        }

        try {
            dispatch({ type: Actions.AddOrUpdateAttribute.Loading })
            await axios.post(url, request);
            dispatch({ type: Actions.AddOrUpdateAttribute.Success })
        }
        catch (error) {
            dispatch({ type: Actions.AddOrUpdateAttribute.Failed, error });
        }
    }
}