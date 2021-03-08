import { Actions } from '../Actions';
import { FoodsState, ReduxAction } from '../Models';

export const Foods = (state: FoodsState = new FoodsState(), action: ReduxAction) => {
    switch(action.type) {
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
        case Actions.GetAllFoods.Loading:
            return {
                ...state
            }
        case Actions.GetFoodDetails.Loading:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    loading: true
                }
            }
        case Actions.GetLikedFoods.Loading:
            return {
                ...state,
                liked: {
                    ...state.liked,
                    loading: true
                }
            }
        case Actions.GetLikedFoods.Success: {
            return {
                ...state,
                liked: {
                    ...state.liked,
                    loading: false,
                    data: action.data.data
                }
            }
        }
        case Actions.GetLikedFoods.Failed: {

        }
        case Actions.GetDislikedFoods.Loading: 
            return {
                ...state
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
        case Actions.SearchFoods.Loading:
            return {
                ...state,
                searchResults: {
                    ...state.searchResults,
                    loading: true
                }
            }
        case Actions.SearchFoods.Success:
            return {
                ...state,
                searchResults: {
                    ...state.searchResults,
                    loading: false,
                    data: action.data.data
                }
            }
        default:
            return state;
    }
}