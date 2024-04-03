import { NotificationPriority } from "../../common/enums";
import { IsNotimail } from "../../profile/is-notimail.validator";
import { IsEnum, IsNotEmpty, IsOptional, IsUrl, MaxLength } from "class-validator";

export class CreateNoficationRequest {
    @IsNotimail()
    to: string;

    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @IsOptional()
    @MaxLength(255)
    message?: string;

    @IsEnum(NotificationPriority)
    priority: NotificationPriority

    @IsOptional()
    @IsUrl({ protocols: ['http', 'https'] })
    image?: string;
}