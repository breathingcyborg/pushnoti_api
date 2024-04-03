import { Exclude, Expose, Type } from "class-transformer";
import { App } from "./app.dto";
import { NotificationPriority } from "../../../core/common/enums";

@Exclude()
export class Notification {
    @Expose()
    id: string

    @Expose()
    appId: string

    @Expose()
    userId: string

    @Expose()
    title: string;

    @Expose()
    message: string | null;

    @Expose()
    image: string | null;

    @Expose()
    priority: NotificationPriority

    @Expose()
    readAt: string | null;

    @Expose()
    createdAt: string;

    @Expose()
    updatedAt: string;
}

@Exclude()
export class UsersNotification extends Notification {
    @Expose()
    @Type(() => App)
    app: App
}