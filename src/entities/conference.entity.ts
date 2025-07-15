import { Models } from '../interfaces';
import {
    Entity,
    Enum,
    PrimaryKey,
    Property,
} from '@mikro-orm/postgresql';

@Entity()
export class Conference {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Enum(() => Models.Conference.Room)
    room!: Models.Conference.Room;

    @Property()
    startsOn: Date = new Date();

    @Property()
    endsOn: Date = new Date();

    @Property()
    createdAt: Date = new Date();

    @Property()
    updatedAt: Date = new Date();
}