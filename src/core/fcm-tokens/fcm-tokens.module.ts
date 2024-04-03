import { Module } from "@nestjs/common";
import { FCMTokensRepo } from "./fcm-tokens.repo";
import { FCMTokensService } from "./fcm-tokens.service";

@Module({
    providers: [ FCMTokensRepo, FCMTokensService ],
    exports: [ FCMTokensService ],
})
export class FCMTokensModule {}