import { IsNotEmpty } from "class-validator";

export class UpdateFCMTokenDto {
    @IsNotEmpty()
    token: string;
}