import { Migration } from '@mikro-orm/migrations';

export class Migration20250716101540 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "speaker" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "biography" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`create table "conference" ("id" serial primary key, "name" varchar(255) not null, "room" text check ("room" in ('room-a', 'room-b', 'room-c', 'room-d', 'room-e', 'room-f', 'room-g', 'room-h', 'room-i', 'room-j')) not null, "date" date not null, "slot" int not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "speaker_id" int not null);`);

    this.addSql(`create table "user" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" text check ("role" in ('member', 'administrator', 'sponsor')) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);

    this.addSql(`create table "conference_users" ("conference_id" int not null, "user_id" int not null, constraint "conference_users_pkey" primary key ("conference_id", "user_id"));`);

    this.addSql(`alter table "conference" add constraint "conference_speaker_id_foreign" foreign key ("speaker_id") references "speaker" ("id") on update cascade;`);

    this.addSql(`alter table "conference_users" add constraint "conference_users_conference_id_foreign" foreign key ("conference_id") references "conference" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "conference_users" add constraint "conference_users_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "conference" drop constraint "conference_speaker_id_foreign";`);

    this.addSql(`alter table "conference_users" drop constraint "conference_users_conference_id_foreign";`);

    this.addSql(`alter table "conference_users" drop constraint "conference_users_user_id_foreign";`);

    this.addSql(`drop table if exists "speaker" cascade;`);

    this.addSql(`drop table if exists "conference" cascade;`);

    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop table if exists "conference_users" cascade;`);
  }

}
