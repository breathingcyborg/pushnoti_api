import { Global, Module } from "@nestjs/common";
import { AppsService } from "./apps.service";
import { AppsRepo } from "./apps.repo";

/**
 * 
 * This module needs to be global.
 * 
 * To authenticate with app's apiKey
 * we need access to AppsRepo. So we 
 * need to declare this module as global
 * so any other module can use the guard.
 * 
 */

@Global()
@Module({
    providers: [ AppsService, AppsRepo ],
    exports: [ AppsService, AppsRepo ]
})
export class AppsModule {}