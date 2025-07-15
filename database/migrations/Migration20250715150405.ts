import { Migration } from '@mikro-orm/migrations';

export class Migration20250715150405 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "conference" drop column "starts_on", drop column "ends_on";`);

    this.addSql(`alter table "conference" add column "date" timestamptz not null, add column "slot" int not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "conference" drop column "slot";`);

    this.addSql(`alter table "conference" add column "ends_on" timestamptz not null;`);
    this.addSql(`alter table "conference" rename column "date" to "starts_on";`);
  }

}
