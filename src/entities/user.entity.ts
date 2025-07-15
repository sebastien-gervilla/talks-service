import { Models } from '../interfaces';
import {
    Entity,
    Enum,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';

@Entity()
export class User {
    @PrimaryKey()
    id!: number;

    @Property()
    firstName!: string;

    @Property()
    lastName!: string;

    @Property({ unique: true })
    email!: string;

    @Property({ hidden: true })
    password!: string;

    @Enum(() => Models.User.Role)
    role!: Models.User.Role;

    @Property()
    createdAt: Date = new Date();

    @Property()
    updatedAt: Date = new Date();
}