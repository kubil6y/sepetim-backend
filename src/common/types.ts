import { FindManyOptions } from 'typeorm';

export interface PaginationMeta {
  totalPages?: number;
  totalResults?: number;
  itemsPerPage?: number;
}

export interface PaginationOutput<K> {
  meta?: PaginationMeta;
  results?: K[];
}

export interface PaginateOptions<K> extends FindManyOptions<K> {
  page?: number;
  take?: number;
}
