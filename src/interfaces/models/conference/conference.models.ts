import { Models } from "@/interfaces";

export interface Get {
    id: number;
    name: string;
    room: Room;
    date: Date;
    slot: number;
    speaker: Models.Speaker.Get;
    users: number[];
}

export interface GetAvailableSlot {
    slot: number;
    rooms: Room[];
}

export interface GetByDay {
    date: Date;
    conferences: Get[];
}

export interface GetQuery {
    name: string;
    room?: Room;
    date?: Date;
    speakerId?: number;
}

export interface Create {
    name: string;
    room: Room;
    date: Date;
    slot: number;
    speakerId: number;
}

export interface Update {
    name: string;
    room: Room;
    date: Date;
    slot: number;
    speakerId: number;
}

export enum Room {
    RoomA = "room-a",
    RoomB = "room-b",
    RoomC = "room-c",
    RoomD = "room-d",
    RoomE = "room-e",
    RoomF = "room-f",
    RoomG = "room-g",
    RoomH = "room-h",
    RoomI = "room-i",
    RoomJ = "room-j",
}