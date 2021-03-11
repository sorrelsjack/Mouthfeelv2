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
    toTry: {
        loading: boolean;
        data: FoodDetails[];
    }
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
        this.toTry = {
            loading: false,
            data: []
        }
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