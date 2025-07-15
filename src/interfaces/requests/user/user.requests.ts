import { Models } from "@/interfaces";
import { HttpRequest } from "@/interfaces/http-interface";

export interface Register extends HttpRequest {
    body: Models.User.Register;
}

export interface Login extends HttpRequest {
    body: Models.User.Login;
}