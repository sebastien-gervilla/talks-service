import { HttpResponses } from "@/interfaces/http-interface";
import { Models } from "@/interfaces";

export interface Get extends HttpResponses {
    200: Models.Speaker.Get[];
}

export interface Post extends HttpResponses {
    204: never;
}

export interface Put extends HttpResponses {
    204: never;
    404: never;
}

export interface Delete extends HttpResponses {
    204: never;
    404: never;
}