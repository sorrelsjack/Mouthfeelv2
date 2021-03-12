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
        case Actions.GetDislikedFoods.Loading: {
            return {
                ...state,
                disliked: {
                    loading: true
                }
            }
        }
        case Actions.GetDislikedFoods.Success: {
            return {
                ...state,
                disliked: {
                    loading: false,
                    data: action.data.data
                }
            }
        }
        case Actions.ManageFoodSentiment.Loading: {
            return {
                ...state,
                sentimentUpdate: {
                    loading: true
                }
            }
        }
        case Actions.ManageFoodSentiment.Success: {
            return {
                ...state,
                sentimentUpdate: {
                    loading: false
                }
            }
        }
        case Actions.GetFoodsToTry.Loading:
            return {
                ...state,
                toTry: {
                    loading: true
                }
            }
        case Actions.GetFoodsToTry.Success:
            return {
                ...state,
                toTry: {
                    loading: false,
                    data: action.data.data
                }
            }
        case Actions.AddOrRemoveFoodToTry.Loading: {
            return {
                ...state,
                toTry: {
                    loading: true
                }
            }
        }
        case Actions.AddOrRemoveFoodToTry.Success: {
            return {
                ...state,
                toTry: {
                    loading: false,
                    data: state.toTry.data
                }
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