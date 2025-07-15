import { HttpResponses } from "@/interfaces/http-interface";

export interface Register extends HttpResponses {
    204: never;
    400: {
        type:
        | 'missing-fields'
        | 'invalid-email'
        | 'email-already-used'
        | 'unknown-error'
    };
}

export interface Login extends HttpResponses {
    204: never;
    404: never;
    400: {
        type:
        | 'missing-fields'
        | 'invalid-identifiers'
        | 'unknown-error'
    };
}