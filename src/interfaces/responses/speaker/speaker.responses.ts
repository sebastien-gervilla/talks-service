import { HttpResponses } from "@/interfaces/http-interface";
import { Models } from "@/interfaces";

export interface Get extends HttpResponses {
    200: Models.Speaker.Get[];
}