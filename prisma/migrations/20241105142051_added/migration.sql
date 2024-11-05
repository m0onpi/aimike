-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "hasBooked" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT,
    "date" TEXT,
    "time" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_email_key" ON "Book"("email");
