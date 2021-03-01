const rootUrl = 'https://mouthfeel-api.azurewebsites.net/api';

export const Urls = {
    foods: {
        getAllFoods: () => `${rootUrl}/foods`,
        getFoodDetails: (id: number) => `${rootUrl}/foods/${id}`
    }
};