import { Models } from '../interfaces';
import {
    Entity,
    Enum,
    ManyToOne,
    PrimaryKey,
    Property,
} from '@mikro-orm/postgresql';
import { Speaker } from './speaker.entity';

@Entity()
export class Conference {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Enum(() => Models.Conference.Room)
    room!: Models.Conference.Room;

    @Property()
    date!: Date;

    @Property()
    slot!: number;

    @Property()
    createdAt: Date = new Date();

    @Property()
    updatedAt: Date = new Date();

    @ManyToOne(() => Speaker)
    speaker!: Speaker;
}