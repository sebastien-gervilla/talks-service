import { Migration } from '@mikro-orm/migrations';

export class Migration20250715140616 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "speaker" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "biography" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);

    this.addSql(`create table "conference" ("id" serial primary key, "name" varchar(255) not null, "room" text check ("room" in ('room-a', 'room-b', 'room-c', 'room-d', 'room-e', 'room-f', 'room-g', 'room-h', 'room-i', 'room-j')) not null, "starts_on" timestamptz not null, "ends_on" timestamptz not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "speaker_id" int not null);`);

    this.addSql(`alter table "conference" add constraint "conference_speaker_id_foreign" foreign key ("speaker_id") references "speaker" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "conference" drop constraint "conference_speaker_id_foreign";`);

    this.addSql(`drop table if exists "speaker" cascade;`);

    this.addSql(`drop table if exists "conference" cascade;`);
  }

}
