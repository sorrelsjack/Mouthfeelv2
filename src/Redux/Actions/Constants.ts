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
    Logout: 'LOGOUT',

    Login: new Action('LOGIN'),
    Register: new Action('REGISTER'),
    GetAllFoods: new Action('GET_ALL_FOODS'),
    GetLikedFoods: new Action('GET_LIKED_FOODS'),
    GetDislikedFoods: new Action('GET_DISLIKED_FOODS'),
    SearchFoods: new Action('SEARCH_FOODS'),
    CreateFood: new Action('CREATE_FOOD'),
    SetFoodLikedStatus: new Action('SET_FOOD_LIKED_STATUS'),
    SetFoodDislikedStatus: new Action('SET_FOOD_DISLIKED_STATUS'),
    GetFoodDetails: new Action('GET_FOOD_DETAILS'),
    GetAllFlavors: new Action('GET_ALL_FLAVORS'),
    GetAllTextures: new Action('GET_ALL_TEXTURES'),
    GetAllMiscellaneous: new Action('GET_ALL_MISCELLANEOUS')
}