import { FoodImage, FoodIngredient, VotableAttribute } from ".";
import { FoodDetails } from "./FoodDetails";
import { FoodSummary } from "./FoodSummary";

export interface Food {
    id: number;
    name: string;
    images: FoodImage[];
    sentiment: number;
    toTry: boolean;
    topThree: VotableAttribute[];
    imageUrl: string;
    ingredients: FoodIngredient[],
    flavors: VotableAttribute[];
    textures: VotableAttribute[];
    miscellaneous: VotableAttribute[];
}