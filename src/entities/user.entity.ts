import { Models } from '../interfaces';
import {
    Collection,
    Entity,
    Enum,
    ManyToMany,
    PrimaryKey,
    Property,
} from '@mikro-orm/postgresql';
import { Conference } from './conference.entity';

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

    @ManyToMany(() => Conference, conference => conference.users)
    conferences = new Collection<Conference>(this);
}