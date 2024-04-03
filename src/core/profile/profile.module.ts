import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { ProfileService } from "./profile.service";

@Module({
    imports: [ UsersModule ],
    providers: [ ProfileService ],
    exports: [ ProfileService ],
})
export class ProfileModule {}