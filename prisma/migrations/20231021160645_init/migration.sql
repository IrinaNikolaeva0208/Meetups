-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MEETUP_ORGANIZER');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "meetup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "longtitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "meetup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "login" TEXT,
    "password" TEXT,
    "roles" "Role"[],
    "provider" TEXT,
    "providerId" TEXT,
    "name" TEXT,
    "age" INTEGER,
    "sex" "Sex",
    "photo" TEXT,
    "email" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meetupUser" (
    "userId" TEXT NOT NULL,
    "meetupId" TEXT NOT NULL,

    CONSTRAINT "meetupUser_pkey" PRIMARY KEY ("userId","meetupId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- CreateIndex
CREATE UNIQUE INDEX "user_providerId_key" ON "user"("providerId");

-- AddForeignKey
ALTER TABLE "meetupUser" ADD CONSTRAINT "meetupUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meetupUser" ADD CONSTRAINT "meetupUser_meetupId_fkey" FOREIGN KEY ("meetupId") REFERENCES "meetup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
