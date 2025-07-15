export interface Get {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
}

export interface Current {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
}

export interface Register {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface JWTPayload {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
}

export enum Role {
    Member = 'member',
    Administrator = 'administrator',
    Sponsor = 'sponsor',
}