import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '../guards/firebase-auth.guard';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) : AuthUser | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.user || null;
  },
);