import { Module } from '@nestjs/common';
import { GlobalsModule } from '../core/globals/globals.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { PlayModule } from './play/play.module';
import { FCMTokensModule } from './fcm-tokens/fcm-tokens.module';
import { AppsModule } from './apps/apps.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    GlobalsModule,
    AuthModule,
    ProfileModule,
    PlayModule,
    FCMTokensModule,
    AppsModule,
    NotificationsModule,
  ],
})
export class ApiModule {}
