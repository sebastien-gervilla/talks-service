export interface HttpResponses {
    401: never;
    403: never;
    500: never;
}

export type HttpRequest = {
    parameters?: {};
    query?: {};
    body?: {};
};