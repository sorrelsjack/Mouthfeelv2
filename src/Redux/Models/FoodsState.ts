import { Food } from './Food';
import { FoodDetails } from './FoodDetails';
import { CreateFoodRequest } from './CreateFoodRequest';

export class FoodsState {
    all: Food[];
    new: CreateFoodRequest;
    selected: {
        loading: boolean;
        data: FoodDetails | null;
    }

    constructor () {
        this.all = [];
        this.new = new CreateFoodRequest(),
        this.selected = {
            loading: false,
            data: null
        };
    }
}