import { Controller, Get, Inject } from "@nestjs/common";
import { App } from "firebase-admin/app";
import { FIREBASE_ADMIN_APP } from "src/core/firebase-admin/constants";
import { getMessaging } from 'firebase-admin/messaging';

@Controller('/play')
export class PlayController {
    constructor(
        @Inject(FIREBASE_ADMIN_APP)
        private readonly app : App
    ) {}

    @Get('/')
    async noti() {
        let token = 'eSzTL2hZTQaE685y5Y9kgM:APA91bGhYUn17J_XUgZVnPy0rVv8bpMjQCgxRlxe6h_Cflc0XPBdzkLzPZ8yyyqzhrQwurWTUP25oxNEgGP1ay7FyPcC9-BIJ7H10-tgDUMVe2-c1Z51v7zBekuDaz4dLZU41jrXVTIO';
        const messaging = getMessaging(this.app);
        await messaging.send({
            token: token,
            notification: {
                body: 'lorem ipsum dolor sit amet',
                title: "Title",
            },
            android: {
                notification: {
                    sound: 'default',                }
            },
        });
    }
}