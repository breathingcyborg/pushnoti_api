import { Provider } from "@nestjs/common";
import { Auth, getAuth } from 'firebase-admin/auth';
import { FIREBASE_ADMIN_APP } from "./constants";
import { App } from 'firebase-admin/app';

export default {
    provide: Auth,
    useFactory: (app : App) => {
      return getAuth(app);
    },
    inject: [FIREBASE_ADMIN_APP],
} satisfies Provider;