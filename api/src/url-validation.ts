export const throwIfNoUrl = (url: string) => {
  if (!url) {
    throw new Error("Please enter a URL");
  }
}

export const throwIfInvalidUrl = (url: string) => {
  try {
    new URL(url);
  } catch (err) {
    throw new Error("Please enter a valid URL");
  }
}

export const throwIfShortenUrl = (url: string) => {
  // to avoid loops we should not allow to short already shortened url
  if (url.includes("localhost:3000")) { // TO DO: make this dynamic
    throw new Error("This URL is already shortened");
  }
}