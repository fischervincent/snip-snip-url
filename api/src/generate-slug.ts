import { customAlphabet } from 'nanoid';

// Create a custom alphabet for nanoid (URL-safe)
const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 8);

export const generateSlug = (): string => {
  const slug = nanoid(); // length of 8 already
  return slug;
}
