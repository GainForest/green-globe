-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "projectId" TEXT,
    "classification" TEXT NOT NULL,
    "ipfsCID" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "extension" TEXT,
    "geoInformation" JSONB[],
    "awsCID" TEXT,
    "dateMeasured" TIMESTAMP(3),
    "dateUploaded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateEdited" TIMESTAMP(3),

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "SOLAccounts" TEXT[],
    "CeloAccounts" TEXT[],
    "EthereumAccounts" TEXT[],
    "PolygonAccounts" TEXT[],

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityMember" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "fundsReceived" DOUBLE PRECISION NOT NULL,
    "profileUrl" TEXT,
    "projectId" TEXT,
    "bio" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "priority" INTEGER,
    "walletId" INTEGER,

    CONSTRAINT "CommunityMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "amount" DOUBLE PRECISION,
    "blockchain" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "hash" TEXT,
    "motive" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "communityMemberId" INTEGER,
    "projectId" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shapefile" (
    "id" SERIAL NOT NULL,
    "assetId" TEXT,
    "area" DOUBLE PRECISION,
    "isReference" BOOLEAN NOT NULL DEFAULT false,
    "default" BOOLEAN NOT NULL DEFAULT false,
    "shortName" TEXT,
    "iNaturalist" TEXT,

    CONSTRAINT "Shapefile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialMedia" (
    "id" SERIAL NOT NULL,
    "projectId" TEXT NOT NULL,
    "facebook" TEXT,
    "linkedIn" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,

    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "organizationId" INTEGER,
    "objective" TEXT,
    "catalogueReason" TEXT,
    "category" TEXT,
    "description" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL DEFAULT '',
    "dataDownloadUrl" TEXT,
    "dataDownloadInfo" TEXT,
    "kyc" BOOLEAN DEFAULT false,
    "monitorStrategy" TEXT,
    "restorationType" TEXT,
    "communitySize" INTEGER,
    "lat" DOUBLE PRECISION,
    "lon" DOUBLE PRECISION,
    "startDate" TEXT,
    "endDate" TEXT,
    "verraId" INTEGER,
    "area" DOUBLE PRECISION,
    "score" TEXT,
    "analysis" TEXT,
    "potentialIssues" TEXT[],
    "customEnterBtnText" TEXT,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "isExternalProject" BOOLEAN NOT NULL DEFAULT true,
    "isProjectOfTheMonth" BOOLEAN NOT NULL DEFAULT false,
    "claimedCarbonOffset" INTEGER,
    "soilCarbon" INTEGER,
    "avoidedCarbon" INTEGER,
    "bufferCarbon" INTEGER,
    "hasReferenceArea" BOOLEAN NOT NULL DEFAULT false,
    "projectUrl" TEXT,
    "discordId" TEXT,
    "stripeUrl" TEXT,
    "proponents" TEXT[],
    "walletId" INTEGER,
    "lastCreditPrice" DOUBLE PRECISION,
    "onChainRetirementCarbon" INTEGER,
    "onChainSupplyCarbon" INTEGER,
    "retirementCarbon" INTEGER,
    "sdgGoals" INTEGER[],
    "supplyCarbon" INTEGER,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shapefile_assetId_key" ON "Shapefile"("assetId");

-- CreateIndex
CREATE UNIQUE INDEX "SocialMedia_projectId_key" ON "SocialMedia"("projectId");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityMember" ADD CONSTRAINT "CommunityMember_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityMember" ADD CONSTRAINT "CommunityMember_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_communityMemberId_fkey" FOREIGN KEY ("communityMemberId") REFERENCES "CommunityMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shapefile" ADD CONSTRAINT "Shapefile_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMedia" ADD CONSTRAINT "SocialMedia_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
