import { FoodImage } from "./FoodImage";
import { VotableAttribute } from "./VotableAttribute";

export interface FoodSummary {
    id: number;
    name: string;
    images: FoodImage[];
    sentiment: number;
    toTry: boolean;
    topThree: VotableAttribute[];
}