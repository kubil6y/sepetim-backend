import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/user/entities/user.entity';

export const METADATAKEY_ROLES = 'roles';

// All: all logged in users
export type AllowedRoles = keyof typeof UserRole | 'All' | 'Public';

export const Role = (...roles: AllowedRoles[]) => {
  return SetMetadata(METADATAKEY_ROLES, roles);
};
