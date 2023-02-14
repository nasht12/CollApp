-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "prompt" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "History_session_id_key" ON "History"("session_id");
