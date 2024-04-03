import { Module } from "@nestjs/common";
import { FCMMessageFactory } from "./factories/fcm-message.factory";
import { NotificationsRepo } from "./repos/notifications.repo";
import { CreateNotificationService } from "./services/create-notification.service";
import { SendNofificationService } from "./services/send-notification.service";
import { UsersModule } from "../users/users.module";
import { NotificationsQueryService } from "./services/notifications-query.service";
import { NotificationReadReceiptService } from "./services/notification-read-receipt.service";
import { FCMTokensModule } from "../fcm-tokens/fcm-tokens.module";

@Module({
    imports: [
        UsersModule,
        FCMTokensModule,
    ],
    providers: [
        NotificationsRepo,
        FCMMessageFactory,
        CreateNotificationService,
        SendNofificationService,
        NotificationsQueryService,
        NotificationReadReceiptService,
    ],
    exports: [
        NotificationsRepo,
        CreateNotificationService,
        SendNofificationService,
        NotificationsQueryService,
        NotificationReadReceiptService,
    ]
})
export class NotificationModule {}