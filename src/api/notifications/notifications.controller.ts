import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AppAuthGuard, AuthApp } from "../auth/guards/app-auth-guard";
import { NotificationsService } from "./notifications.service";
import { App } from "../auth/decorators/app.decorator";
import { CreateNoficationRequest } from "../../core/notifications/dtos/create-notification-request";
import { AuthUser, FirebaseAuthGuard } from "../auth/guards/firebase-auth.guard";
import { ListUsersNotificationsRequest } from "../../core/notifications/dtos/list-users-notifications-request";
import { User } from "../auth/decorators/user.decorator";
import { NotificationReadReceiptService } from "../../core/notifications/services/notification-read-receipt.service";

@Controller('notifications')
export class NotificationsController {

    constructor(
        private readonly service: NotificationsService,
        private readonly readReceiptService: NotificationReadReceiptService,
    ) {}


    @Get('latest')
    @UseGuards(FirebaseAuthGuard)
    @UsePipes(ValidationPipe)
    @UseInterceptors(ClassSerializerInterceptor)
    async listUsersLatestNotifications(
        @Query() request: ListUsersNotificationsRequest,
        @User() user: AuthUser
    ) {
        return this.service.listUsersLatestNotifications(
            user.id,
            request
        );
    }

    @Get(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(FirebaseAuthGuard)
    async findById(
        @Param('id') id: string,
        @User() user: AuthUser
    ) {
        return this.service.findUserNotificationById(user.id, id);
    }

    @Post(':id/read-receipt')
    @UsePipes(ValidationPipe)
    @UseGuards(FirebaseAuthGuard)
    async markRead(
        @Param('id') id: string,
        @User() user: AuthUser
    ) {
        await this.readReceiptService.markRead(user.id, id);
        return;
    }

    @Post('/')
    @UseGuards(AppAuthGuard)
    @UsePipes(ValidationPipe)
    async createNotification(
        @Body() dto: CreateNoficationRequest,
        @App() app : AuthApp
    ) {
        return this.service.createAndSend(dto, app.id);
    }

    @Get('/')
    @UseGuards(FirebaseAuthGuard)
    @UsePipes(ValidationPipe)
    @UseInterceptors(ClassSerializerInterceptor)
    async listUsersNotifications(
        @Query() request: ListUsersNotificationsRequest,
        @User() user: AuthUser
    ) {
        return this.service.listUsersNotifications(
            user.id,
            request
        );
    }

}

