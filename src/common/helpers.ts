export const capitalize = (term: string) => {
  return term[0].toUpperCase() + term.slice(1).toLowerCase();
};

export const trimSlashes = (term: string): string => {
  return term
    .split('')
    .map((el) => (el === '-' ? '' : el))
    .join('');
};

// https://gist.github.com/codeguy/6684588#gistcomment-2759673
export const slugify = (str: string, seperator: string = '-'): string => {
  str = str.trim();
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaaaeeeeiiiioooouuuunc------';

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  return str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes
    .replace(/^-+/, '') // trim - from start of text
    .replace(/-+$/, '') // trim - from end of text
    .replace(/-/g, seperator);
};

interface OrderRatings {
  speed: number;
  taste: number;
  service: number;
}

export const ratingValidation = (obj: OrderRatings) => {
  return Object.values(obj).every((num) => num >= 0 && num <= 10);
};
