import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { applicationDefault } from "firebase-admin/app";
import { FirebaseAdminModuleOptions } from "src/core/firebase-admin/firebase-admin.module-options";

@Injectable()
export class FirebaseAdminModuleOptionsFactory {
    constructor(
        private readonly config : ConfigService
    ) {}

    async create() : Promise<FirebaseAdminModuleOptions> {
        // const dbUrl = this.config.getOrThrow<string>("FIREBASE_DATABASE_URL");
        this.config.getOrThrow<string>("GOOGLE_APPLICATION_CREDENTIALS");
        const options : FirebaseAdminModuleOptions = {
          appOptions: {
            // requires
            // GOOGLE_APPLICATION_CREDENTIALS
            // its absolute path to firebase admin credentials
            credential: applicationDefault(),
            // databaseURL: dbUrl,
          }
        }
        return options;
    }
}