-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasProject" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "projectId" TEXT;
