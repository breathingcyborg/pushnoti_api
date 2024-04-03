import { IsInt, IsOptional, Max, Min } from "class-validator";
import { Type } from "class-transformer";


export class ListUsersNotificationsRequest {

    @IsOptional()
    lastId?: string;

    @IsOptional()
    lastTimestamp?: string;

    @Type(() => Number)
    @IsInt()
    @Min(2)
    @Max(30)
    limit: number;
}
