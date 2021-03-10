const rootUrl = 'https://mouthfeel-api.azurewebsites.net/api';

export const Urls = {
    foods: {
        new: () => `${rootUrl}/foods`,
        getAll: () => `${rootUrl}/foods`,
        getDetails: (id: number) => `${rootUrl}/foods/${id}`,
        search: (query: string, filter?: string[]) => `${rootUrl}/foods/search?query=${query}${filter ? `&filter=${filter.join(',')}` : ''}`,
        liked: () => `${rootUrl}/foods/liked`,
        disliked: () => `${rootUrl}/foods/disliked`
    },
    flavors: {
        getAll: () => `${rootUrl}/flavors`
    },
    textures: {
        getAll: () => `${rootUrl}/textures`
    },
    misc: {
        getAll: () => `${rootUrl}/misc`
    },
    users: {
        register: () => `${rootUrl}/register`,
        authenticate: () => `${rootUrl}/authenticate`
    },
    comments: {
        new: () => `${rootUrl}/comments`,
        delete: (commentId: number) => `${rootUrl}/comments/${commentId}`,
        byFood: (foodId: number) => `${rootUrl}/comments/${foodId}`
    }
    // TODO: Manage comment vote, create reducer
};