import { CoreRepository } from 'src/common/core.repository';
import { EntityRepository } from 'typeorm';
import { Verification } from '../entities/verification.entity';

@EntityRepository(Verification)
export class VerificationRepository extends CoreRepository<Verification> {}
