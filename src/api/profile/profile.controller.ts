import { Body, ClassSerializerInterceptor, Controller, Patch, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { FirebaseAuth } from "../auth/decorators/firebase-auth.decorator";
import { AuthUser } from "../auth/guards/firebase-auth.guard";
import { User } from "../auth/decorators/user.decorator";
import { SetNotimailRequest } from "../../core/profile/set-notimail-request";
import { ProfileService } from "../../core/profile/profile.service";

@Controller('/profile')
@UseInterceptors(ClassSerializerInterceptor)
export class ProfileController {

    constructor(
        private readonly profileService : ProfileService,
    ) {}

    @Patch('notimail')
    @FirebaseAuth()
    @UsePipes(ValidationPipe)
    async setNotimail(
        @Body() request : SetNotimailRequest,
        @User() user : AuthUser,
    ) {
        return this.profileService.setNotimail(user.id, request);
    }
}