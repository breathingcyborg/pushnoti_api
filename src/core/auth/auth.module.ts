import { Module } from "@nestjs/common";
import { SyncFirebaseUserService } from "./services/sync-firebase-user.service";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [ UsersModule ],
    providers: [ SyncFirebaseUserService ],
    exports: [ SyncFirebaseUserService ],
})
export class AuthModule {}