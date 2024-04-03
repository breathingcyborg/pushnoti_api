import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthApp } from '../guards/app-auth-guard';

export const App = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) : AuthApp | null => {
    const request = ctx.switchToHttp().getRequest();
    return request.app || null;
  },
);