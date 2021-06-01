import { VotableAttribute, Food, FoodIngredient, FoodImage } from '.';

export interface FoodDetails {
    id: number;
    name: string;
    images: FoodImage[];
    imageUrl: string;
    sentiment: number;
    toTry: boolean;
    ingredients: FoodIngredient[],
    flavors: VotableAttribute[];
    textures: VotableAttribute[];
    miscellaneous: VotableAttribute[];
}