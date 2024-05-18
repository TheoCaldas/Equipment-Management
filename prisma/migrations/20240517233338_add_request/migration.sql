/*
  Warnings:

  - You are about to drop the column `amount` on the `Equipment` table. All the data in the column will be lost.
  - Added the required column `total` to the `Equipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "amount",
ADD COLUMN     "total" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "userCPF" TEXT NOT NULL,
    "equipType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_userCPF_fkey" FOREIGN KEY ("userCPF") REFERENCES "User"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_equipType_fkey" FOREIGN KEY ("equipType") REFERENCES "Equipment"("type") ON DELETE RESTRICT ON UPDATE CASCADE;
