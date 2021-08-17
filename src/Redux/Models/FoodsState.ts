import { Food } from './Food';
import { FoodDetails } from './FoodDetails';
import { CreateFoodRequest } from './CreateFoodRequest';
import { ApiData, ApiOperation, FoodSummary } from '.';

export class FoodsState {
    all: Food[];

    foodToTryUpdate: ApiOperation;
    sentimentUpdate: ApiOperation;
    createNewFood: ApiOperation;
    addOrUpdateAttribute: ApiOperation;

    searchResults: ApiData<number[]>;
    liked: ApiData<number[]>;
    disliked: ApiData<number[]>;
    toTry: ApiData<number[]>;
    recommended: ApiData<number[]>;

    selected: {
        loading: boolean;
        data: Food | null;
    }

    constructor () {
        this.all = [];

        this.foodToTryUpdate = new ApiOperation();
        this.sentimentUpdate = new ApiOperation();
        this.createNewFood = new ApiOperation();
        this.addOrUpdateAttribute = new ApiOperation();

        this.searchResults = new ApiData<number[]>([]);
        this.liked = new ApiData<number[]>([]);
        this.disliked = new ApiData<number[]>([]);
        this.toTry = new ApiData<number[]>([]);
        this.recommended = new ApiData<number[]>([]);
        
        this.selected = {
            loading: false,
            data: null
        };
    }
}