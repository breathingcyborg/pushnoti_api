import { Module } from "@nestjs/common";
import { AuthModule as CoreAuthModule } from '../../core/auth/auth.module';
import { AuthController } from "./auth.controller";

@Module({ 
    imports: [ CoreAuthModule ],
    controllers: [ AuthController ],
})
export class AuthModule {}