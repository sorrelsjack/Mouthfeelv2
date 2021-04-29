import { Food } from './Food';
import { FoodDetails } from './FoodDetails';
import { CreateFoodRequest } from './CreateFoodRequest';
import { ApiData, ApiOperation } from '.';

// TODO: Maybe we have a store for All foods. Then, liked, disliked, and toTry can just contain ids? This way, we can have a list we can maintain that all lists can draw from
// TODO: Maybe Liked / Disliked / To Try should return a more simple response in the API
export class FoodsState {
    all: FoodDetails[];

    foodToTryUpdate: ApiOperation;
    sentimentUpdate: ApiOperation;
    createNewFood: ApiOperation;
    addOrUpdateAttribute: ApiOperation;

    searchResults: ApiData<FoodDetails[]>;
    liked: ApiData<FoodDetails[]>;
    disliked: ApiData<FoodDetails[]>;
    toTry: ApiData<FoodDetails[]>;

    selected: {
        loading: boolean;
        data: FoodDetails | null;
    }

    constructor () {
        this.all = [];

        this.foodToTryUpdate = new ApiOperation();
        this.sentimentUpdate = new ApiOperation();
        this.createNewFood = new ApiOperation();
        this.addOrUpdateAttribute = new ApiOperation();

        this.searchResults = new ApiData<FoodDetails[]>([]);
        this.liked = new ApiData<FoodDetails[]>([]);
        this.disliked = new ApiData<FoodDetails[]>([]);
        this.toTry = new ApiData<FoodDetails[]>([]);
        
        this.selected = {
            loading: false,
            data: null
        };
    }
}