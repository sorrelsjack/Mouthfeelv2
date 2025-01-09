import axios from 'axios';
import 'react-native-get-random-values';
import { Dispatch, } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { Actions } from '.';
import { IsIos, Urls } from '../../Common';
import { AttributeType } from '../../Models';
import { AddOrUpdateAttributeRequest, CreateFoodRequest, FoodDetails } from '../Models';

export const SetSelectedFoodAction = (food: FoodDetails) => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: Actions.SetSelectedFood, data: food });
    }
}

export const CreateFoodAction = (food: CreateFoodRequest) => {
    let formData = new FormData();

    const imagePath = IsIos() ? food.image.replace("file://", "") : food.image;

    formData.append('name', food.name);
    if (food.image) formData.append('image', { uri: imagePath, name: `image-${uuidv4()}`, type: 'image/jpeg' });
    formData.append('flavors', food.flavors.toString());
    formData.append('textures', food.textures.toString());
    formData.append('miscellaneous', food.miscellaneous.toString());

    return async (dispatch: Dispatch) => {
        try {
            dispatch({ type: Actions.CreateFood.Loading });
            const newFood = await axios.post(
                Urls.foods.new(),
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );
            dispatch({ type: Actions.CreateFood.Success, data: newFood });
        }
        catch (error) {
            dispatch({ type: Actions.CreateFood.Failed, error });
        }
    }
}

export const ResetCreateFoodAction = () => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: Actions.ResetCreateFood })
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
            const res = await axios.post(Urls.foods.sentiment(), { foodId, sentiment });
            dispatch({ type: Actions.ManageFoodSentiment.Success, data: res });
        }
        catch (error) {
            dispatch({ type: Actions.ManageFoodSentiment.Failed, error })
        }
    }
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
            dispatch({ type: Actions.AddOrRemoveFoodToTry.Success, data: foodId })
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
            const res = (await axios.post(url, request)).data;
            dispatch({ type: Actions.AddOrUpdateAttribute.Success, data: { response: res, foodId: request.foodId, attributeType: attributeType, attributeId: request.attributeId } })
        }
        catch (error) {
            dispatch({ type: Actions.AddOrUpdateAttribute.Failed, error });
        }
    }
}