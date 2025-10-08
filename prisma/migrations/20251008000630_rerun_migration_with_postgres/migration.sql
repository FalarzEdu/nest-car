-- CreateEnum
CREATE TYPE "public"."carStatus" AS ENUM ('available', 'sold');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "public"."Car" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "colour" TEXT NOT NULL,
    "status" "public"."carStatus" NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "roles" "public"."Role" NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Sale" (
    "id" SERIAL NOT NULL,
    "car_id" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_car_id_key" ON "public"."Sale"("car_id");

-- AddForeignKey
ALTER TABLE "public"."Sale" ADD CONSTRAINT "Sale_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "public"."Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
