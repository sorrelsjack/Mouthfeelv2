class Action {
    Loading: string;
    Success: string;
    Failed: string;

    constructor(base: string) {
        const actionName = (suffix: string) => `${base}${suffix}`;

        this.Loading = actionName('_LOADING');
        this.Success = actionName('_SUCCESS');
        this.Failed = actionName('_FAILED');
    }
}

export const Actions = {
    SetSelectedFood: 'SET_SELECTED_FOOD',

    User: {
        Login: new Action('LOGIN'),
        Logout: 'LOGOUT',
        Register: new Action('REGISTER'),
    },

    Flavors: {
        GetAll: new Action('GET_ALL_FLAVORS')
    },

    Textures: {
        GetAll: new Action('GET_ALL_TEXTURES'),
    },

    Miscellaneous: {
        GetAll: new Action('GET_ALL_MISCELLANEOUS')
    },

    GetLikedFoods: new Action('GET_LIKED_FOODS'),
    GetDislikedFoods: new Action('GET_DISLIKED_FOODS'),
    ManageFoodSentiment: new Action('MANAGE_FOOD_SENTIMENT'),
    GetRecommendedFoods: new Action('GET_RECOMMENDED_FOODS'),
    GetFoodsToTry: new Action('GET_FOODS_TO_TRY'),
    AddOrRemoveFoodToTry: new Action('ADD_OR_REMOVE_FOOD_TO_TRY'),
    SearchFoods: new Action('SEARCH_FOODS'),
    ClearSearch: 'CLEAR_SEARCH',
    AddOrUpdateAttribute: new Action('ADD_OR_UPDATE_ATTRIBUTE'),
    CreateFood: new Action('CREATE_FOOD'),
    SetFoodLikedStatus: new Action('SET_FOOD_LIKED_STATUS'),
    SetFoodDislikedStatus: new Action('SET_FOOD_DISLIKED_STATUS'),
    GetFoodDetails: new Action('GET_FOOD_DETAILS'),
}