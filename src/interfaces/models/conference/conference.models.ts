export interface Get {
    id: number;
    name: string;
    room: Room;
    startsOn: Date;
    endsOn: Date;
}

export interface Create {
    name: string;
    room: Room;
    startsOn: Date;
    endsOn: Date;
    speakerId: number;
}

export interface Update {
    name: string;
    room: Room;
    startsOn: Date;
    endsOn: Date;
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