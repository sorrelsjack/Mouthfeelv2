import { VotableAttribute, Food, FoodIngredient } from '.';

export interface FoodDetails {
    id: number;
    name: string;
    imageUrl: string;
    sentiment: number;
    toTry: boolean;
    ingredients: FoodIngredient[],
    flavors: VotableAttribute[];
    textures: VotableAttribute[];
    miscellaneous: VotableAttribute[];
}