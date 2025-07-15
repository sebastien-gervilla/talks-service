import {
    Entity,
    PrimaryKey,
    Property,
} from '@mikro-orm/postgresql';

@Entity()
export class Speaker {
    @PrimaryKey()
    id!: number;

    @Property()
    firstName!: string;

    @Property()
    lastName!: string;

    @Property()
    biography!: string;

    @Property()
    createdAt: Date = new Date();

    @Property()
    updatedAt: Date = new Date();
}