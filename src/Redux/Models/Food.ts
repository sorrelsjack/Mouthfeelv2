import { FoodImage } from ".";

export interface Food {
    id: number;
    name: string;
    imageUrl: string;
    images: FoodImage[];
}