import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const TENANT_KEY = 'tenant_optional';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return true;
    }

    const resourceCompanyId =
      request.params.companyId ||
      request.body?.company_id ||
      request.query?.company_id;

    const isOptional = this.reflector.getAllAndOverride<boolean>(TENANT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!resourceCompanyId && isOptional) {
      return true;
    }

    if (resourceCompanyId && user.company_id !== resourceCompanyId) {
      throw new ForbiddenException('Access denied: company mismatch');
    }

    return true;
  }
}

export const TenantOptional = () => Reflector.createDecorator<boolean>();
