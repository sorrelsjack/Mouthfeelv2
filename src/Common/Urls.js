const rootUrl = 'http:/10.0.2.2:3000';

export const Urls = {
    foods: {
        getAllFoods: () => `${rootUrl}/foods`,
        getFoodDetails: (id) => `${rootUrl}/foods/${id}`
    }
};