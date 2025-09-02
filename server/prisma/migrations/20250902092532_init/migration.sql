/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ReceivedMessages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SentMessages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ReceivedMessages" DROP CONSTRAINT "ReceivedMessages_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SentMessages" DROP CONSTRAINT "SentMessages_userId_fkey";

-- DropIndex
DROP INDEX "public"."User_name_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "refreshToken",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "public"."ReceivedMessages";

-- DropTable
DROP TABLE "public"."SentMessages";

-- CreateTable
CREATE TABLE "public"."Message" (
    "id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
