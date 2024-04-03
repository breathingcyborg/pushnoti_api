import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepo } from "../users/repos/users.repo";
import { USER_NOT_FOUND } from "../users/error-codes";
import { SetNotimailRequest } from "./set-notimail-request";
import { Auth } from "firebase-admin/auth";
import { FIREBASE_USER_NOT_FOUND } from "../auth/error-codes";


@Injectable()
export class ProfileService {

    constructor(
        private readonly usersRepo : UsersRepo,
        private readonly firebaseAuth : Auth,
    ) {}

    async setNotimail(userId: string, request: SetNotimailRequest) {

        const notimail = request.notimail;

        const user = await this.usersRepo.findById(userId)
        if (!user) {
            throw new BadRequestException({
                message: 'User not found',
                code: USER_NOT_FOUND,
            });
        }

        const firebaseUser = await this.firebaseAuth.getUser(userId);
        if (!firebaseUser) {
            throw new BadRequestException({
                message: 'Firebase user not found',
                code: FIREBASE_USER_NOT_FOUND,
            });
        }

        const existingUser = await this.usersRepo.findByNotimail(notimail);
        if (existingUser && existingUser.id != user.id) {
            throw new BadRequestException({
                message: 'Notimail is taken',
                code: NOTIMAIL_TAKEN,
            });
        }

        await this.usersRepo.update(userId, {
            notimail: notimail,
        });

        await this.firebaseAuth.setCustomUserClaims(userId, {
            'notimail': notimail,
        });
    }
}