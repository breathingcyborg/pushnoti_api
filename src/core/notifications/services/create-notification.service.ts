import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateNoficationRequest } from "../dtos/create-notification-request";
import { AppsRepo } from "../../apps/apps.repo";
import { UsersRepo } from "../../users/repos/users.repo";
import { NOTIFICATION_APP_NOT_FOUND, NOTIFICATION_USER_NOT_FOUND } from "../error-codes";
import { NewNotification } from "../../schema/notifications.schema";
import { NotificationsRepo } from "../repos/notifications.repo";

@Injectable()
export class CreateNotificationService {

    constructor(
        private readonly appsRepo: AppsRepo,
        private readonly usersRepo: UsersRepo,
        private readonly notificationsRepo : NotificationsRepo,
    ) {}

    async create(request: CreateNoficationRequest, appId: string) {
        const app = await this.appsRepo.findById(appId);
        if (!app) {
            throw new BadRequestException({
                message: 'app not found',
                code: NOTIFICATION_APP_NOT_FOUND
            });
        }

        const user = await this.usersRepo.findByNotimail(request.to);
        if (!user) {
            throw new BadRequestException({
                message: 'user not found',
                code: NOTIFICATION_USER_NOT_FOUND
            });
        }

        // create notification
        const notification : NewNotification = {
            userId: user.id,
            appId: app.id,
            title: request.title,
            image: request.image,
            message: request.message,
            priority: request.priority,
        };
        return this.notificationsRepo.insert(notification);
    }
}