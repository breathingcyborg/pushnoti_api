import { Injectable } from "@nestjs/common";
import { CreateNoficationRequest } from "../../core/notifications/dtos/create-notification-request";
import { ListUsersNotificationsRequest } from "../../core/notifications/dtos/list-users-notifications-request";
import { CreateNotificationService } from "../../core/notifications/services/create-notification.service";
import { SendNofificationService } from "../../core/notifications/services/send-notification.service";
import { NotificationsQueryService } from "../../core/notifications/services/notifications-query.service";
import { plainToInstance } from "class-transformer";
import { UsersNotification } from "../common/dtos/notifications.dto";

@Injectable()
export class NotificationsService {
    constructor(
        private readonly createNotificationService : CreateNotificationService,
        private readonly sendNotificationService: SendNofificationService,
        private readonly notificationsQueryService: NotificationsQueryService
    ) {}

    async createAndSend(request: CreateNoficationRequest, appId: string) {
        const notificationId = await this.createNotificationService.create(request, appId);
        const sendResult = await this.sendNotificationService.send(notificationId);
        return sendResult;
    }

    async findUserNotificationById(userId: string, notificationId: string) {
        const notification = await this.notificationsQueryService.findUserNotificationById(userId, notificationId);
        if (notification === null) {
            return null;
        }
        return plainToInstance(UsersNotification, notification);
    }

    async listUsersNotifications(
        userId: string,
        request: ListUsersNotificationsRequest,
    ) {
        const notifications = await this.notificationsQueryService.listUsersNotifications(
            userId,
            request
        );
        return notifications.map(
            notification => plainToInstance(UsersNotification, notification)
        );
    }

    async listUsersLatestNotifications(
        userId: string,
        request: ListUsersNotificationsRequest,
    ) {
        const notifications = await this.notificationsQueryService.listUsersLatestNotifications(
            userId,
            request
        );
        return notifications.map(
            notification => plainToInstance(UsersNotification, notification)
        );
    }
}