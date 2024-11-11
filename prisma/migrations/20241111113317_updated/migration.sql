-- CreateTable
CREATE TABLE "user_submissions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "selectedPackage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "additional_services" (
    "id" SERIAL NOT NULL,
    "serviceName" TEXT NOT NULL,
    "userSubmissionId" INTEGER NOT NULL,

    CONSTRAINT "additional_services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_submissions_email_key" ON "user_submissions"("email");

-- AddForeignKey
ALTER TABLE "additional_services" ADD CONSTRAINT "additional_services_userSubmissionId_fkey" FOREIGN KEY ("userSubmissionId") REFERENCES "user_submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
