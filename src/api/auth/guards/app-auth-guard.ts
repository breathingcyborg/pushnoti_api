import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { extractBearerToken } from "../utils/extract-bearer-token";
import type { Request } from 'express';
import { AppsRepo } from "../../../core/apps/apps.repo";

@Injectable()
export class AppAuthGuard implements CanActivate {

    constructor(
        private readonly appsRepo : AppsRepo
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request : Request = context.switchToHttp().getRequest();

        const apiKey = extractBearerToken(request.get('Authorization') || '');
        if (!apiKey) {
            throw new BadRequestException('invalid authorization header');
        }

        const app = await this.appsRepo.findByApiKey(apiKey);
        if (!app) {
            throw new UnauthorizedException('');
        }

        request.app = { id: app.id, displayName: app.displayName };

        return true;
    }

}

export type AuthApp = {
    id: string
    displayName?: string
}

declare module 'express' {
    interface Request {
      app?: AuthApp,
    }
}