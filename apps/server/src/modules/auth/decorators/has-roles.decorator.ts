import { UserRole } from '@allergy-management/models';
import { SetMetadata } from '@nestjs/common';
/**
 * This is the decorator that is used to say that a resource needs the specified roles to access it
 * @param roles
 * @returns
 */

export const HasRoles = (...roles: UserRole[]) => SetMetadata('roles', roles);
