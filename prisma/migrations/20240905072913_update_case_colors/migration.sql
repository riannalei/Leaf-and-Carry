/*
  Warnings:

  - The values [black,white] on the enum `CaseColor` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CaseColor_new" AS ENUM ('natural', 'cream', 'pink');
ALTER TABLE "Configuration" ALTER COLUMN "color" TYPE "CaseColor_new" USING ("color"::text::"CaseColor_new");
ALTER TYPE "CaseColor" RENAME TO "CaseColor_old";
ALTER TYPE "CaseColor_new" RENAME TO "CaseColor";
DROP TYPE "CaseColor_old";
COMMIT;
