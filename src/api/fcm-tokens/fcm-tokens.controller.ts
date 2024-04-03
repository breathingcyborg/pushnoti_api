import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FCMTokensService } from "../../core/fcm-tokens/fcm-tokens.service";
import { UpdateFCMTokenDto } from "src/core/fcm-tokens/update-fcm-token.dto";
import { User } from "../auth/decorators/user.decorator";
import { AuthUser } from "../auth/guards/firebase-auth.guard";
import { FirebaseAuth } from "../auth/decorators/firebase-auth.decorator";

@Controller('fcm-tokens')
@UsePipes(ValidationPipe)
@UseInterceptors(ClassSerializerInterceptor)
export class FCMTokensController {

    constructor(
        private readonly service : FCMTokensService
    ) {}

    @Post('/')
    @FirebaseAuth()
    async update(
        @Body() dto: UpdateFCMTokenDto,
        @User() user: AuthUser
    ) {
        await this.service.createOrUpdate(dto, user.id);
    }
}