import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { NotificationsRepo } from "../repos/notifications.repo";

@Injectable()
export class NotificationReadReceiptService {
    constructor(
        private readonly repo : NotificationsRepo
    ) {}

    async markRead(userId: string, notificationId: string) {

        const notification = await this.repo.findById(notificationId);

        if (!notification) {
            throw new NotFoundException('no such notification');
        }

        if (notification.userId != userId) {
            throw new UnauthorizedException();
        }

        if (notification.readAt != null) {
            return;
        }

        await this.repo.update(notificationId, {
            readAt: (new Date()).toISOString(),
        });
    }
}