import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context) {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
