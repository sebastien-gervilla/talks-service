import { Migration } from '@mikro-orm/migrations';

export class Migration20250715153540 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "conference_users" ("conference_id" int not null, "user_id" int not null, constraint "conference_users_pkey" primary key ("conference_id", "user_id"));`);

    this.addSql(`create table "user_conferences" ("user_id" int not null, "conference_id" int not null, constraint "user_conferences_pkey" primary key ("user_id", "conference_id"));`);

    this.addSql(`alter table "conference_users" add constraint "conference_users_conference_id_foreign" foreign key ("conference_id") references "conference" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "conference_users" add constraint "conference_users_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "user_conferences" add constraint "user_conferences_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "user_conferences" add constraint "user_conferences_conference_id_foreign" foreign key ("conference_id") references "conference" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "conference_users" cascade;`);

    this.addSql(`drop table if exists "user_conferences" cascade;`);
  }

}
