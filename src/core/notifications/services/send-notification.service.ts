import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { NotificationsRepo } from "../repos/notifications.repo";
import { NOTIFICATION_NOT_FOUND } from "../error-codes";
import { FCMMessageFactory } from "../factories/fcm-message.factory";
import { Messaging, getMessaging } from "firebase-admin/messaging";
import { App } from "firebase-admin/app";
import { FIREBASE_ADMIN_APP } from "../../firebase-admin/constants";
import { CreateFCMMessageArguments } from "../dtos/create-fcm-message-arguments";
import { FCMTokensService } from "../../fcm-tokens/fcm-tokens.service";

export type SendNotificationResponse = {
    failureCount: number;
    successCount: number;
}

@Injectable()
export class SendNofificationService {

    private messaging : Messaging;

    constructor(
        private readonly notificationsRepo : NotificationsRepo,
        private readonly fcmMessageFactory : FCMMessageFactory,
        @Inject(FIREBASE_ADMIN_APP)
        readonly firebaseApp : App,
        private readonly fcmTokensService: FCMTokensService,
    ) {
        this.messaging = getMessaging(firebaseApp);
    }

    async send(notificationId: string) :  Promise<SendNotificationResponse> {

        // find notification with user tokens
        const notification = await this.notificationsRepo.findById(notificationId);
        if (!notification) {
            throw new BadRequestException({
                message: 'notification not found',
                code: NOTIFICATION_NOT_FOUND,
            });
        }


        // list of fcm tokens
        const tokens = (await this.fcmTokensService.findFreshTokens(notification.userId))
            .map(({ token }) => token);

        // no tokens return
        if (tokens.length <= 0) {
            return {
                failureCount: 0,
                successCount: 0
            };
        }

        // arguments for fcm message factory 
        const args : CreateFCMMessageArguments = new CreateFCMMessageArguments({
            content: notification.message || undefined,
            image: notification.image || undefined,
            title: notification.title,
            tokens: tokens,
            notificationId: notification.id,
            priority: notification.priority,
        });
    
        // create fcm multicast message
        const message = await this.fcmMessageFactory.createMulticast(args);

        // send multicast message
        const response = await this.messaging.sendEachForMulticast(message);

        return {
            failureCount: response.failureCount,
            successCount: response.successCount,
        }
    }
}

