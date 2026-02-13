export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type RouteSpec = {
    url: string;
    method: HttpMethod;
    form: () => {
        action: string;
        method: HttpMethod;
    };
};

export const createRoute = (url: string, method: HttpMethod = 'get'): RouteSpec => ({
    url,
    method,
    form: () => ({ action: url, method }),
});
