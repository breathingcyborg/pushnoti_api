import { Module } from "@nestjs/common";
import { NotificationModule as CoreNotificationsModule } from '../../core/notifications/notifications.module';
import { NotificationsService } from "./notifications.service";
import { NotificationsController } from "./notifications.controller";

@Module({
    imports: [ CoreNotificationsModule ],
    providers: [ NotificationsService ],
    controllers: [ NotificationsController ],
})
export class NotificationsModule {}