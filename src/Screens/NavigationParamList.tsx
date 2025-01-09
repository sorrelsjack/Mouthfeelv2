import { AttributeType } from "../Models";

export type NavigationParamList = {
    AppIntro: undefined;
    ContactUs: undefined;
    Disliked: undefined;
    FoodDetails: undefined;
    Help: undefined;
    Home: undefined;
    Liked: undefined;
    Login: undefined;
    Settings: undefined;
    Submit: undefined;
    Tags: {
        attributeType: AttributeType,
        preselectedAttributes: number[]
    }
    ToTry: undefined;
}