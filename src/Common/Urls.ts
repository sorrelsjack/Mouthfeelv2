const rootUrl = 'https://mouthfeel-api.azurewebsites.net/api';

export const Urls = {
    foods: {
        getAll: () => `${rootUrl}/foods`,
        getDetails: (id: number) => `${rootUrl}/foods/${id}`,
        search: (query: string, filter?: string[]) => `${rootUrl}/foods/search?query=${query}${filter ? `&filter=${filter.join(',')}` : ''}`
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