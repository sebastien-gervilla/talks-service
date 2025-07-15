import { HttpRequest } from "@/interfaces/http-interface";
import { Models } from "@/interfaces";

export interface Get extends HttpRequest { }

export interface Post extends HttpRequest {
    body: Models.Speaker.Create;
}

export interface Put extends HttpRequest {
    body: Models.Speaker.Update;
}

export interface Delete extends HttpRequest { }