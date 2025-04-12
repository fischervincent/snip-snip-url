export const throwIfInvalidUrl = (url: string) => {
  try {
    new URL(url);
  } catch (err) {
    throw new Error("Please enter a valid URL");
  }
}