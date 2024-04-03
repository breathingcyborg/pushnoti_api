import { NotificationsRepo } from "../repos/notifications.repo"
import { ListUsersNotificationsRequest } from "../dtos/list-users-notifications-request";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationsQueryService {

    constructor(
        private readonly repo : NotificationsRepo
    ) {}

    async listUsersNotifications(userId: string, request: ListUsersNotificationsRequest) {
        const notifications = await this.repo.cursorPaginateUserNotifications({
            userId: userId,
            lastId: request.lastId,
            lastTimestamp: request.lastTimestamp,
            limit: request.limit,
        });
        return notifications;
    }

    async listUsersLatestNotifications(userId: string, request: ListUsersNotificationsRequest) {
        const notifications = await this.repo.cursorPaginateUserLatestNotifications({
            userId: userId,
            lastId: request.lastId,
            lastTimestamp: request.lastTimestamp,
            limit: request.limit,
        });
        return notifications;
    }

    async findUserNotificationById(userId: string, notificiationId: string) {
        const notification = await this.repo.findById(notificiationId);
        if (!notification || notification.userId != userId) {
            return null;
        }
        return notification;
    }

}