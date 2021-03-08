import { Food } from './Food';
import { FoodDetails } from './FoodDetails';
import { CreateFoodRequest } from './CreateFoodRequest';

export class FoodsState {
    all: Food[];
    liked: {
        loading: boolean;
        data: FoodDetails[];
    }
    disliked: FoodDetails[];
    new: CreateFoodRequest;
    searchResults: {
        loading: boolean;
        data: Food[];
    }
    selected: {
        loading: boolean;
        data: FoodDetails | null;
    }

    constructor () {
        this.all = [];
        this.liked = {
            loading: false,
            data: []
        }
        this.disliked = [];
        this.new = new CreateFoodRequest(),
        this.searchResults = {
            loading: false,
            data: []
        },
        this.selected = {
            loading: false,
            data: null
        };
    }
}