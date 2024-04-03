import { Module } from "@nestjs/common";
import { ProfileModule as CoreProfileModule } from "../../core/profile/profile.module";
import { ProfileController } from "./profile.controller";

@Module({
    imports: [ CoreProfileModule ],
    controllers: [ ProfileController ]
})
export class ProfileModule {}