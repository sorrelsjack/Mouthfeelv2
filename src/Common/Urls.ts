const rootUrl = 'https://mouthfeel-api.azurewebsites.net/api';

export const Urls = {
    foods: {
        getAll: () => `${rootUrl}/foods`,
        getFoodDetails: (id: number) => `${rootUrl}/foods/${id}`
    },
    flavors: {
        getAll: () => `${rootUrl}/flavors`
    },
    textures: {
        getAll: () => `${rootUrl}/textures`
    },
    misc: {
        getAll: () => `${rootUrl}/misc`
    }
};