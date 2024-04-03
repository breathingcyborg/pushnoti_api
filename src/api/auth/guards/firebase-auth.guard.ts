import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from 'express';
import { Auth } from "firebase-admin/auth";
import { extractBearerToken } from "../utils/extract-bearer-token";


@Injectable()
export class FirebaseAuthGuard implements CanActivate {

    constructor(
        private readonly firebaseAuth : Auth
    ) {}

    async canActivate(context: ExecutionContext) : Promise<boolean> {

        const request : Request = context.switchToHttp().getRequest();

        // debugging
        // request.user = { id: 'sSr7lskoykf8Qt673po3Kmbjsmr2', notimail: 'shrey@pushnoti.com' };
        // return true;

        const token = extractBearerToken(request.get('Authorization') || '');
        if (!token) {
            throw new BadRequestException('invalid authorization header');
        }

        try {

            const payload = await this.firebaseAuth.verifyIdToken(token);
            
            const id = payload.uid;
            const notimail = payload['notimail'] || null;

            request.user = { id, notimail }
    
        } catch (e) {
            throw new UnauthorizedException('', {
                cause: e,
            })
        }

        return true;
    }

}

export type AuthUser = {
    id: string;
    notimail: string | null;
}

declare module 'express' {
    interface Request {
      user?: AuthUser,
    }
}