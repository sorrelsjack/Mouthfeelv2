const rootUrl = 'https://mouthfeel-api.azurewebsites.net/api';

export const Urls = {
    foods: {
        getAll: () => `${rootUrl}/foods`,
        getDetails: (id: number) => `${rootUrl}/foods/${id}`,
        search: (query: string, filter?: string[]) => `${rootUrl}/foods/search?query=${query}${filter ? `&filter=${filter.join(',')}` : ''}`,
        liked: () => `${rootUrl}/foods/liked`,
        disliked: () => `${rootUrl}/foods/disliked`,
        sentiment: () => `${rootUrl}/foods/sentiment`,
        new: () => `${rootUrl}/foods`,
        recommended: () => `${rootUrl}/foods/recommended`,
        toTry: () => `${rootUrl}/foods/to-try`,
        flavors: (id: number) => `${rootUrl}/foods/${id}/flavors`,
        textures: (id: number) => `${rootUrl}/foods/${id}/textures`,
        misc: (id: number) => `${rootUrl}/foods/${id}/miscellaneous`
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
        register: () => `${rootUrl}/users/register`,
        authenticate: () => `${rootUrl}/users/authenticate`
    },
    comments: {
        new: () => `${rootUrl}/comments`,
        delete: (commentId: number) => `${rootUrl}/comments/${commentId}`,
        byFood: (foodId: number) => `${rootUrl}/comments/${foodId}`,
        vote: () => `${rootUrl}/comments`
    }
    // TODO: Manage comment vote, create reducer
};