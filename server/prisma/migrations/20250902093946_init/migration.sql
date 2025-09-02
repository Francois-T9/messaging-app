-- AlterTable
CREATE SEQUENCE "public".message_id_seq;
ALTER TABLE "public"."Message" ALTER COLUMN "id" SET DEFAULT nextval('"public".message_id_seq');
ALTER SEQUENCE "public".message_id_seq OWNED BY "public"."Message"."id";
