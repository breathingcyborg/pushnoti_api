import { IsString, Matches } from "class-validator";
import { NOTIMAIL_REGEX } from "./constants";

export class SetNotimailRequest {
    @IsString()
    @Matches(NOTIMAIL_REGEX, {
        message: 'invalid notimail correct format is username@pushnoti.com'
    })
    notimail: string
}