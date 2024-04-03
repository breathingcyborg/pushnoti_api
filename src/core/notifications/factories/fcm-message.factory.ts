import { Injectable } from "@nestjs/common";
import { AndroidNotification, MulticastMessage } from "firebase-admin/messaging";
import { CreateFCMMessageArguments } from "../dtos/create-fcm-message-arguments";
import { NotificationPriority } from "../../common/enums";

@Injectable()
export class FCMMessageFactory {
    async createMulticast(request: CreateFCMMessageArguments) : Promise<MulticastMessage> {
        const androidNotification : AndroidNotification = androidNotificationsMap[request.priority];

        return {
            tokens: request.tokens,
            notification: {
                body: request.content,
                imageUrl: request.image,
                title: request.title,
            },
            android: {
                notification: androidNotification,
            },
            data: {
                notificationId: request.notificationId,
            }
        }
    }
}

const androidNotificationsMap : Record<NotificationPriority, AndroidNotification> = {
    [NotificationPriority.Urgent]: {
        priority: 'high',
        channelId: NotificationPriority.Urgent,
        lightSettings: {
            color: '#ff0000',
            lightOnDurationMillis: 500,
            lightOffDurationMillis: 500,
        },
        vibrateTimingsMillis: [0, 1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000, 1000],
        sound: "notification_urgent_priority",
    },
    [NotificationPriority.High]: {
        priority: 'default',
        channelId: NotificationPriority.High,
        sound: "notification_high_priority",
        defaultVibrateTimings: true,
        vibrateTimingsMillis: [0, 1000, 2000, 1000, 2000, 1000],
    },
    [NotificationPriority.Standard]: {
        priority: 'low',
        channelId: NotificationPriority.Standard,
    },
}