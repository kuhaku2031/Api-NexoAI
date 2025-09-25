import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from '../enum/role.enum';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';

export function Auth(userRole: UserRole) {

  // You can customize this function to accept or custom decorators as needed  
  return applyDecorators(
    // Add other decorators like @UseGuards(AuthGuard, RolesGuard) if needed
    // Use the userRole parameter to set roles dynamically if needed
    Roles(userRole),
    UseGuards(AuthGuard, RolesGuard),
  );
}
