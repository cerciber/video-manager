-- DropForeignKey
ALTER TABLE "AuthUsers" DROP CONSTRAINT "AuthUsers_rolId_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_videoId_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_videoId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionMethods" DROP CONSTRAINT "PermissionMethods_methodId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionMethods" DROP CONSTRAINT "PermissionMethods_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionPathKeys" DROP CONSTRAINT "PermissionPathKeys_pathKeyId_fkey";

-- DropForeignKey
ALTER TABLE "PermissionPathKeys" DROP CONSTRAINT "PermissionPathKeys_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "Permissions" DROP CONSTRAINT "Permissions_rolId_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_authUserId_fkey";

-- DropForeignKey
ALTER TABLE "Videos" DROP CONSTRAINT "Videos_userId_fkey";

-- AddForeignKey
ALTER TABLE "AuthUsers" ADD CONSTRAINT "AuthUsers_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rols"("rolId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_authUserId_fkey" FOREIGN KEY ("authUserId") REFERENCES "AuthUsers"("authUserId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Videos" ADD CONSTRAINT "Videos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permissions" ADD CONSTRAINT "Permissions_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rols"("rolId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionMethods" ADD CONSTRAINT "PermissionMethods_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("permissionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionMethods" ADD CONSTRAINT "PermissionMethods_methodId_fkey" FOREIGN KEY ("methodId") REFERENCES "Methods"("methodId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionPathKeys" ADD CONSTRAINT "PermissionPathKeys_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permissions"("permissionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PermissionPathKeys" ADD CONSTRAINT "PermissionPathKeys_pathKeyId_fkey" FOREIGN KEY ("pathKeyId") REFERENCES "PathKeys"("pathKeyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Videos"("videoId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Videos"("videoId") ON DELETE CASCADE ON UPDATE CASCADE;
