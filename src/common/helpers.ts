export const capitalize = (term: string) => {
  return term[0].toUpperCase() + term.slice(1).toLowerCase();
};

export const trimSlashes = (term: string): string => {
  return term
    .split('')
    .map((el) => (el === '-' ? '' : el))
    .join('');
};
