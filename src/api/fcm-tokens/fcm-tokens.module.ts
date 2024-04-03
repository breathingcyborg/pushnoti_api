import { Module } from "@nestjs/common";
import { FCMTokensModule as CoreFCMTokensModule } from "../../core/fcm-tokens/fcm-tokens.module";
import { FCMTokensController } from "./fcm-tokens.controller";

@Module({
    imports: [ CoreFCMTokensModule ],
    controllers: [ FCMTokensController ],
})
export class FCMTokensModule {}