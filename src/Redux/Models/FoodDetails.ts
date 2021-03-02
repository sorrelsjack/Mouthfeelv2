import { VotableAttribute, Food } from '.';

export interface FoodDetails {
    food: Food;
    flavors: VotableAttribute[];
    textures: VotableAttribute[];
    miscellaneous: VotableAttribute[];
}