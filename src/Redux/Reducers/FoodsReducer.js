import { Actions } from '../Actions';

const defaultState = {
    foods: [],
    selected: {}
}

export const Foods = (state = defaultState, action) => {
    switch(action.type) {
        case Actions.GetAllFoodsSuccess:
            return {
                ...state
            }
        case Actions.GetFoodDetailsSuccess:
            return {
                ...state,
                selected: action.data.data
            }
        default:
            return state;
    }
}