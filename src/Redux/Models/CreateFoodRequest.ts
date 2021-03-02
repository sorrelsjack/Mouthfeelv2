export class CreateFoodRequest {
    name: string;
    imageUrl: string;
    flavors: number[];
    textures: number[];
    miscellaneous: number[];

    constructor() {
        this.name = '';
        this.imageUrl = '';
        this.flavors = [];
        this.textures = [];
        this.miscellaneous = [];
    }
}