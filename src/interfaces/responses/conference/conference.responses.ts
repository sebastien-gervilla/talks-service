import { HttpResponses } from "@/interfaces/http-interface";
import { Models } from "@/interfaces";

export interface Get extends HttpResponses {
    200: Models.Conference.Get[];
}

export interface Post extends HttpResponses {
    204: never;
    400: {
        type:
        | 'missing-fields'
        | 'room-not-found'
        | 'unknown-error'
    };
}

export interface Put extends HttpResponses {
    204: never;
    404: never;
    400: {
        type:
        | 'missing-fields'
        | 'room-not-found'
        | 'unknown-error'
    };
}