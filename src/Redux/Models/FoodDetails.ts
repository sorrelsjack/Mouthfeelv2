import { VotableAttribute, Food, FoodIngredient } from '.';

export interface FoodDetails {
    id: number;
    name: string;
    imageUrl: string;
    sentiment: number;
    ingredients: FoodIngredient[],
    flavors: VotableAttribute[];
    textures: VotableAttribute[];
    miscellaneous: VotableAttribute[];
}