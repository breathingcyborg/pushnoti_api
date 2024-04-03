import { Provider } from "@nestjs/common";
import { FIREBASE_ADMIN_APP } from "./constants";
import { MODULE_OPTIONS_TOKEN } from "./firebase-admin.module-definition";
import { FirebaseAdminModuleOptions } from "./firebase-admin.module-options";
import { initializeApp } from "firebase-admin/app";

export default {
    provide: FIREBASE_ADMIN_APP,
    useFactory: (options: FirebaseAdminModuleOptions) => {
        const app = initializeApp(options.appOptions);
        return app;
    },
    inject: [ MODULE_OPTIONS_TOKEN ]
} satisfies Provider;