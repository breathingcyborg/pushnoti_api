import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DrizzleModule } from "../drizzle/drizzle.module";
import { FirebaseAdminModule } from "../firebase-admin/firebase-admin.module";
import { FirebaseAdminModuleOptionsFactory } from "./firebase-admin-module-options.factory";
import { AppsModule } from "../apps/apps.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DrizzleModule,
        FirebaseAdminModule.registerAsync({
            isGlobal: true,
            useClass: FirebaseAdminModuleOptionsFactory,
        }),
        AppsModule,
    ]
})
export class GlobalsModule {}