import { Models } from "@/interfaces";
import { HttpRequest } from "@/interfaces/http-interface";

export interface GetCurrent extends HttpRequest { }

export interface GetCurrentConferences extends HttpRequest { }

export interface Register extends HttpRequest {
    body: Models.User.Register;
}

export interface Login extends HttpRequest {
    body: Models.User.Login;
}

export interface Logout extends HttpRequest { }

export interface DeleteCurrent extends HttpRequest { }