export class CreateFoodRequest {
    name: string;
    image: string;
    flavors: number[];
    textures: number[];
    miscellaneous: number[];

    constructor() {
        this.name = '';
        this.image = '';
        this.flavors = [];
        this.textures = [];
        this.miscellaneous = [];
    }
}