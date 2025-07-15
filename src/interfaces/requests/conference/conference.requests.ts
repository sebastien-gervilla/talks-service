import { HttpRequest } from "@/interfaces/http-interface";
import { Models } from "@/interfaces";

export interface Get extends HttpRequest { }

export interface Post extends HttpRequest {
    body: Models.Conference.Create;
}

export interface Put extends HttpRequest {
    body: Models.Conference.Update;
}