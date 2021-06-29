import { capitalize } from './helpers';

type NotFoundField =
  | 'user'
  | 'restaurant'
  | 'verification'
  | 'category'
  | 'dish';

export const notFound = (field: NotFoundField) => ({
  ok: false,
  error: `${capitalize(field)} not found`,
});

export const f = (msg: string) => ({
  ok: false,
  error: msg,
});
