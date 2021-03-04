import { Actions } from '../Actions';
import { FoodsState, ReduxAction } from '../Models';

export const Foods = (state: FoodsState = new FoodsState(), action: ReduxAction) => {
    switch(action.type) {
        case Actions.SetSelectedFood:
            return {
                ...state,
                selected: action.data.data
            }
        case Actions.GetAllFoodsSuccess:
            return {
                ...state
            }
        case Actions.GetFoodDetailsLoading:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    loading: true
                }
            }
        case Actions.GetFoodDetailsSuccess:
            return {
                ...state,
                selected: {
                    ...state.selected,
                    loading: false,
                    data: action.data.data
                }
            }
        case Actions.SearchFoodsLoading:
            return {
                ...state,
                searchResults: {
                    ...state.searchResults,
                    loading: true
                }
            }
        case Actions.SearchFoodsSuccess:
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