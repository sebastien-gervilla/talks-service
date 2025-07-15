import {
    Entity,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';

@Entity()
export class Speaker {
    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    startsOn: Date = new Date();

    @Property()
    endsOn: Date = new Date();

    @Property()
    createdAt: Date = new Date();

    @Property()
    updatedAt: Date = new Date();
}