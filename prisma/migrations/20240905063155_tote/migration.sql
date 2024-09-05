-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('fulfilled', 'shipped', 'awaiting_shipment');

-- CreateEnum
CREATE TYPE "CaseModel" AS ENUM ('small', 'medium', 'large');

-- CreateEnum
CREATE TYPE "CaseMaterial" AS ENUM ('cotton', 'linen');

-- CreateEnum
CREATE TYPE "CaseFinish" AS ENUM ('normal', 'glossy');

-- CreateEnum
CREATE TYPE "CaseColor" AS ENUM ('black', 'white');

-- CreateTable
CREATE TABLE "Configuration" (
    "id" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "color" "CaseColor",
    "model" "CaseModel",
    "material" "CaseMaterial",
    "finish" "CaseFinish",
    "croppedImageURl" TEXT,

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);
