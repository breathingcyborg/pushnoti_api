import { BadRequestException, Injectable } from "@nestjs/common";
import { Auth } from "firebase-admin/auth";
import { UsersRepo } from "../../users/repos/users.repo";
import { FIREBASE_USER_NOT_FOUND } from "../error-codes";

@Injectable()
export class SyncFirebaseUserService {
    constructor(
        private readonly firebaseAuth : Auth,
        private readonly usersRepo : UsersRepo
    ) {}

    async sync(firebaseUid: string) {

        try {

            const firebaseUser = await this.firebaseAuth.getUser(firebaseUid);
            const { email, displayName } = firebaseUser;

            const dbUser = await this.usersRepo.findById(firebaseUid);

            if (!dbUser) {
                await this.usersRepo.create({
                    id: firebaseUid,
                    email: email,
                    displayName: displayName,
                });
            } else {
                await this.usersRepo.update(firebaseUid, {
                    displayName,
                    email,
                })
            }


        } catch(e) {

            if (e.code && e.code === 'auth/user-not-found') {
                throw new BadRequestException({
                    message: 'Firebase user not found',
                    code: FIREBASE_USER_NOT_FOUND
                });
            }

            throw e;
        }
    }
}