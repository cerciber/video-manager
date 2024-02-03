-- CreateTable
CREATE TABLE "Rols" (
    "rolId" SERIAL NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "Rols_pkey" PRIMARY KEY ("rolId")
);

-- CreateTable
CREATE TABLE "Methods" (
    "methodId" SERIAL NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "Methods_pkey" PRIMARY KEY ("methodId")
);

-- CreateTable
CREATE TABLE "PathKeys" (
    "pathKeyId" SERIAL NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "PathKeys_pkey" PRIMARY KEY ("pathKeyId")
);

-- CreateTable
CREATE TABLE "AuthUsers" (
    "authUserId" SERIAL NOT NULL,
    "rolId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "AuthUsers_pkey" PRIMARY KEY ("authUserId")
);

-- CreateTable
CREATE TABLE "Users" (
    "userId" SERIAL NOT NULL,
    "authUserId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Videos" (
    "videoId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "credits" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL,
    "publicationDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Videos_pkey" PRIMARY KEY ("videoId")
);

-- CreateTable
CREATE TABLE "Permissions" (
    "permissionId" SERIAL NOT NULL,
    "rolId" INTEGER NOT NULL,

    CONSTRAINT "Permissions_pkey" PRIMARY KEY ("permissionId")
);

-- CreateTable
CREATE TABLE "PermissionMethods" (
    "permissionMethodId" SERIAL NOT NULL,
    "permissionId" INTEGER NOT NULL,
    "methodId" INTEGER NOT NULL,

    CONSTRAINT "PermissionMethods_pkey" PRIMARY KEY ("permissionMethodId")
);

-- CreateTable
CREATE TABLE "PermissionPathKeys" (
    "permissionPathKeysId" SERIAL NOT NULL,
    "permissionId" INTEGER NOT NULL,
    "pathKeyId" INTEGER NOT NULL,

    CONSTRAINT "PermissionPathKeys_pkey" PRIMARY KEY ("permissionPathKeysId")
);

-- CreateTable
CREATE TABLE "Likes" (
    "userId" INTEGER NOT NULL,
    "videoId" INTEGER NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("userId","videoId")
);

-- CreateTable
CREATE TABLE "Comments" (
    "commentId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "videoId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "publicationDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("commentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rols_key_key" ON "Rols"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Methods_key_key" ON "Methods"("key");

-- CreateIndex
CREATE UNIQUE INDEX "PathKeys_key_key" ON "PathKeys"("key");

-- CreateIndex
CREATE UNIQUE INDEX "AuthUsers_username_key" ON "AuthUsers"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_authUserId_key" ON "Users"("authUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_cellphone_key" ON "Users"("cellphone");

-- AddForeignKey
ALTER TABLE "AuthUsers" ADD CONSTRAINT "AuthUsers_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rols"("rolId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_authUserId_fkey" FOREIGN KEY ("authUserId") REFERENCES "AuthUsers"("authUserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rols"("rolId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionMethods" ADD CONSTRAINT "PermissionMethods_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("permissionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionMethods" ADD CONSTRAINT "PermissionMethods_methodId_fkey" FOREIGN KEY ("methodId") REFERENCES "Methods"("methodId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionPathKeys" ADD CONSTRAINT "PermissionPathKeys_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("permissionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionPathKeys" ADD CONSTRAINT "PermissionPathKeys_pathKeyId_fkey" FOREIGN KEY ("pathKeyId") REFERENCES "PathKeys"("pathKeyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Videos"("videoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Videos"("videoId") ON DELETE RESTRICT ON UPDATE CASCADE;
