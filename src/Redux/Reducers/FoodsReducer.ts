import { Actions } from '../Actions';
import { FoodsState, ReduxAction } from '../Models';

export const Foods = (state: FoodsState = new FoodsState(), action: ReduxAction) => {
    switch (action.type) {
        case Actions.SetSelectedFood:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    data: {
                        ...state.selected.data,
                        id: action.data
                    }
                }
            }
        case Actions.GetFoodDetails.Loading:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    loading: true
                }
            }
        case Actions.GetFoodDetails.Success:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    loading: false,
                    data: action.data.data
                }
            }
        case Actions.GetFoodDetails.Failed:
            return {
                ...state,
                selected: {

                }
            }

        case Actions.GetLikedFoods.Loading:
            return { ...state, liked: state.liked.startLoading() }
        case Actions.GetLikedFoods.Success:
            return { ...state, liked: state.liked.succeeded(action.data.data) }
        case Actions.GetLikedFoods.Failed: 
            return { ...state, liked: state.liked.failed(action.error?.response?.data) }

        case Actions.GetDislikedFoods.Loading:
            return { ...state, disliked: state.disliked.startLoading() }
        case Actions.GetDislikedFoods.Success:
            return { ...state, disliked: state.disliked.succeeded(action.data.data) }
        case Actions.GetDislikedFoods.Failed:
            return { ...state, disliked: state.disliked.failed(action.error?.response?.data) }

        case Actions.ManageFoodSentiment.Loading: 
            return { ...state, sentimentUpdate: state.sentimentUpdate.startLoading() }
        case Actions.ManageFoodSentiment.Success:
            return { ...state, sentimentUpdate: state.sentimentUpdate.succeeded() }
        case Actions.ManageFoodSentiment.Failed:
            return { ...state, sentimentUpdate: state.sentimentUpdate.failed(action.error?.response?.data) }

        case Actions.GetFoodsToTry.Loading:
            return { ...state, toTry: state.toTry.startLoading() }
        case Actions.GetFoodsToTry.Success:
            return { ...state, toTry: state.toTry.succeeded(action.data.data) }
        case Actions.GetFoodsToTry.Failed:
            return { ...state, toTry: state.toTry.failed(action.error?.response?.data) }

        case Actions.AddOrRemoveFoodToTry.Loading: 
            return { ...state, toTry: state.foodToTryUpdate.startLoading() }
        case Actions.AddOrRemoveFoodToTry.Success:
            return { ...state, toTry: state.foodToTryUpdate.succeeded() }
        case Actions.AddOrRemoveFoodToTry.Failed:
            return { ...state, toTry: state.foodToTryUpdate.failed(action.error?.response?.data) }

        case Actions.SearchFoods.Loading:
            return { ...state, searchResults: state.searchResults.startLoading() }
        case Actions.SearchFoods.Success:
            return { ...state, searchResults: state.searchResults.succeeded(action.data.data) }
        case Actions.SearchFoods.Failed:
            return { ...state, searchResults: state.searchResults.failed(action.error?.response?.data) }
            
        case Actions.ClearSearch: {
            return {
                ...state,
                searchResults: {
                    loading: false,
                    data: []
                }
            }
        }
        default:
            return state;
    }
}