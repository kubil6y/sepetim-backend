import { CoreRepository } from 'src/common/core.repository';
import { EntityRepository } from 'typeorm';
import { Address } from '../entities/address.entity';

@EntityRepository(Address)
export class AddressRepository extends CoreRepository<Address> {}
