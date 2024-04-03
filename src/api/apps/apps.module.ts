import { Module } from '@nestjs/common';
import { AppsModule as CoreAppsModule } from '../../core/apps/apps.module';
import { AppsController } from './apps.controller';

@Module({
    imports: [ CoreAppsModule ],
    controllers: [ AppsController ],
})
export class AppsModule {}