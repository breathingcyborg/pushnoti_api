import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './firebase-admin.module-definition';
import firebaseAppProvider from './firebase-app.provider';
import firebaseAuthProvider from './firebase-auth.provider';

@Module({
    providers: [
        firebaseAppProvider,
        firebaseAuthProvider,
    ],
    exports: [
        firebaseAppProvider,
        firebaseAuthProvider,
    ]
})
export class FirebaseAdminModule extends ConfigurableModuleClass {}
