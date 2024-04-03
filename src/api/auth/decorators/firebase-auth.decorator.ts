import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common"
import { CHECK_NOTIMAIL } from "../constants"
import { FirebaseAuthGuard } from "../guards/firebase-auth.guard";
import { CheckNotimailGuard } from "../guards/check-notimail.guard";

export function FirebaseAuth(checkNotimail: boolean = false) {
    return applyDecorators(
        SetMetadata(CHECK_NOTIMAIL, checkNotimail),
        UseGuards(FirebaseAuthGuard, CheckNotimailGuard),
    );
}