import { IsArray, IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";
import { AndroidNotification } from "firebase-admin/messaging";
import { NotificationPriority } from "src/core/common/enums";


export class CreateFCMMessageArguments {
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @IsArray()
    @IsString({ each: true })
    tokens: string[];

    @IsOptional()
    @MaxLength(255)
    content?: string;

    @IsOptional()
    @IsUrl({
        protocols: ['http', 'https'],
    })
    image?: string;

    @IsEnum(NotificationPriority)
    priority: NotificationPriority;

    @IsString()
    notificationId: string

    constructor(args: Partial<CreateFCMMessageArguments>) {
        Object.assign(this, args);
    }
}
