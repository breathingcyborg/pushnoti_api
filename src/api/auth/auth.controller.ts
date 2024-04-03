import { Controller, Post, Put } from "@nestjs/common";
import { SyncFirebaseUserService } from "../../core/auth/services/sync-firebase-user.service";
import { FirebaseAuth } from "./decorators/firebase-auth.decorator";
import { User } from "./decorators/user.decorator";
import { AuthUser } from "./guards/firebase-auth.guard";

@Controller('/auth')
export class AuthController {
 
    constructor(
        private readonly syncService : SyncFirebaseUserService,
    ) {}

    @Post('/firebase-sync')
    @FirebaseAuth()
    async syncWithFirebase(@User() user : AuthUser) {
        await this.syncService.sync(user.id);
    }
}