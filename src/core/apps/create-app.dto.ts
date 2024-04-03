import { IsNotEmpty } from "class-validator";

export class CreateAppDTO {
    @IsNotEmpty()
    displayName: string
}