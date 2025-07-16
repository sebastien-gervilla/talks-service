import { HttpRequest } from "@/interfaces/http-interface";
import { Models } from "@/interfaces";

export interface Get extends HttpRequest {
    query: Models.Conference.GetQuery;
}

export interface GetAvailableSlots extends HttpRequest {
    query: {
        date: Date;
    };
}

export interface Post extends HttpRequest {
    body: Models.Conference.Create;
}

export interface Put extends HttpRequest {
    body: Models.Conference.Update;
}

export interface Delete extends HttpRequest { }

export interface Join extends HttpRequest { }

export interface Leave extends HttpRequest { }