import { Actions } from '../Actions';
import { ApiData, FoodDetails, FoodsState, ReduxAction } from '../Models';

export const Foods = (state: FoodsState = new FoodsState(), action: ReduxAction) => {

    const AddToAll = (data: ApiData<FoodDetails[]>) => {
        const newIds = data.data?.map(d => d.id);
        const withoutNew = state.all.filter(f => !newIds?.some(i => i === f.id));
        return withoutNew.concat(data.data ?? [])
    }

    switch (action.type) {
        case Actions.SetSelectedFood:
            return { ...state, selected: { ...state.selected, data: action.data } }
            
        case Actions.GetFoodDetails.Loading:
            return { ...state, selected: { ...state.selected, loading: true } }
        case Actions.GetFoodDetails.Success: return { ...state, selected: { ...state.selected, loading: false, data: action.data.data } }
        case Actions.GetFoodDetails.Failed:
            return { ...state, selected: { ...state.selected, loading: false } }

        case Actions.GetLikedFoods.Loading:
            return { ...state, liked: state.liked.startLoading() }
        case Actions.GetLikedFoods.Success:
            return { ...state, all: AddToAll(action.data), liked: state.liked.succeeded(action.data.data.map(f => f.id)) }
        case Actions.GetLikedFoods.Failed:
            return { ...state, liked: state.liked.failed(action.error?.response?.data) }

        case Actions.GetDislikedFoods.Loading:
            return { ...state, disliked: state.disliked.startLoading() }
        case Actions.GetDislikedFoods.Success:
            return { ...state, all: AddToAll(action.data), disliked: state.disliked.succeeded(action.data.data.map(f => f.id)) }
        case Actions.GetDislikedFoods.Failed:
            return { ...state, disliked: state.disliked.failed(action.error?.response?.data) }

        case Actions.ManageFoodSentiment.Loading:
            return { ...state, sentimentUpdate: state.sentimentUpdate.startLoading() }
        case Actions.ManageFoodSentiment.Success: {
            let current = state.all.find(f => f.id === action.data.data.foodId) ?? {};
            current.sentiment = action.data.data.sentiment;
            const withoutNew = state.all.filter(f => f.id !== action.data.data.foodId);

            return {
                ...state,
                all: withoutNew.concat(current),
                sentimentUpdate: state.sentimentUpdate.succeeded()
            }
        }
        case Actions.ManageFoodSentiment.Failed:
            return { ...state, sentimentUpdate: state.sentimentUpdate.failed(action.error?.response?.data) }

        case Actions.GetFoodsToTry.Loading:
            return { ...state, toTry: state.toTry.startLoading() }
        case Actions.GetFoodsToTry.Success:
            return { ...state, all: AddToAll(action.data), toTry: state.toTry.succeeded(action.data.data.map(f => f.id)) }
        case Actions.GetFoodsToTry.Failed:
            return { ...state, toTry: state.toTry.failed(action.error?.response?.data) }

        case Actions.GetRecommendedFoods.Loading:
            return { ...state, recommended: state.recommended.startLoading() }
        case Actions.GetRecommendedFoods.Success:
            return { ...state, all: AddToAll(action.data), recommended: state.recommended.succeeded(action.data.data.map(f => f.id)) }
        case Actions.GetRecommendedFoods.Failed:
            return { ...state, recommended: state.recommended.failed(action.error?.response?.data) }

        // TODO: Might need a reset associated with this
        case Actions.CreateFood.Loading:
            return { ...state, createNewFood: state.createNewFood.startLoading() }
        case Actions.CreateFood.Success:
            return { ...state, all: state.all.concat(action.data), createNewFood: state.createNewFood.succeeded() }
        case Actions.CreateFood.Failed:
            return { ...state, createNewFood: state.createNewFood.failed(action.error?.response?.data) }

        case Actions.AddOrRemoveFoodToTry.Loading:
            return { ...state, toTry: state.foodToTryUpdate.startLoading() }
        case Actions.AddOrRemoveFoodToTry.Success: {
            let current = state.all.find(f => f.id === action.data) ?? {};
            current.toTry = !current.toTry;
            const withoutNew = state.all.filter(f => f.id !== action.data);

            return {
                ...state,
                all: withoutNew.concat(current),
                toTry: state.foodToTryUpdate.succeeded()
            }
        }
        case Actions.AddOrRemoveFoodToTry.Failed:
            return { ...state, toTry: state.foodToTryUpdate.failed(action.error?.response?.data) }

        // TODO: do an update in All
        case Actions.AddOrUpdateAttribute.Loading:
            return { ...state, addOrUpdateAttribute: state.addOrUpdateAttribute.startLoading() }
        case Actions.AddOrUpdateAttribute.Success:
            return { ...state, addOrUpdateAttribute: state.addOrUpdateAttribute.succeeded() }
        case Actions.AddOrUpdateAttribute.Failed:
            return { ...state, addOrUpdateAttribute: state.addOrUpdateAttribute.failed(action.error?.response?.data) }

        case Actions.SearchFoods.Loading:
            return { ...state, searchResults: state.searchResults.startLoading() }
        case Actions.SearchFoods.Success:
            return { ...state, all: AddToAll(action.data.data), searchResults: state.searchResults.succeeded(action.data.data.map(f => f.id)) }
        case Actions.SearchFoods.Failed:
            return { ...state, searchResults: state.searchResults.failed(action.error?.response?.data) }

        case Actions.ClearSearch:
            return { ...state, searchResults: state.searchResults.reset() }

        default:
            return state;
    }
}