import { Actions } from '../Actions';

const defaultState = {
    foods: [],
    selected: {
        loading: false,
        data: {}
    }
}

export const Foods = (state = defaultState, action) => {
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
        default:
            return state;
    }
}