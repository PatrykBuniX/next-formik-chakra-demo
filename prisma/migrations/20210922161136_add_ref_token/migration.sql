-- CreateTable
CREATE TABLE "refresh_tokens" (
    "token" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");
