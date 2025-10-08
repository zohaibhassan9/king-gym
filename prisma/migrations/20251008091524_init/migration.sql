-- CreateTable
CREATE TABLE "members" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "memberId" TEXT NOT NULL,
    "memberName" TEXT NOT NULL,
    "cnicNumber" TEXT,
    "contactNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "package" TEXT NOT NULL,
    "packagePrice" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "finalPrice" INTEGER NOT NULL,
    "joiningDate" TEXT NOT NULL,
    "expiryDate" TEXT NOT NULL,
    "photo" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "payments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "memberId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "method" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "transactionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "payments_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "attendance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "memberId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "checkInTime" TEXT,
    "checkOutTime" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "attendance_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "members" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "members_memberId_key" ON "members"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_transactionId_key" ON "payments"("transactionId");
