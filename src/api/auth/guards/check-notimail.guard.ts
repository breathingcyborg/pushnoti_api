import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { CHECK_NOTIMAIL } from "../constants";
import { AuthUser } from "./firebase-auth.guard";

@Injectable()
export class CheckNotimailGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    /**
     * 
     * A guard to check if user has selected notimail.
     * 
     */
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // Get the value of CHECK_NOTIMAIL metadata associated with the route handler
        const shouldCheck = this.reflector.get<boolean>(CHECK_NOTIMAIL, context.getHandler());

        if (!shouldCheck) {
            return true;
        }

        const user = context.switchToHttp().getRequest().user as AuthUser | undefined | null;

        // Check user notimail is set
        return Boolean(user) && Boolean(user.notimail);
    }
}