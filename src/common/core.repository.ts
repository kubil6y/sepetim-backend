import { Repository } from 'typeorm';
import { PaginateOptions, PaginationOutput } from './types';

export class CoreRepository<T> extends Repository<T> {
  async paginate({
    page = 1,
    take = 10,
    ...rest
  }: PaginateOptions<T>): Promise<PaginationOutput<T>> {
    const skip = (page - 1) * take;
    const [results, totalResults] = await this.findAndCount({
      take,
      skip,
      ...rest,
    });

    const itemsPerPage = take;
    const totalPages = Math.ceil(totalResults / take);

    return {
      meta: {
        totalPages,
        itemsPerPage,
        totalResults,
      },
      results,
    };
  }
}
