const SERVER_URL = "http://localhost:3000";

export const postUrlToShorten = async (url: string) => {
  const result = await fetch(`${SERVER_URL}/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
  const jsonResult = await result.json();
  if (jsonResult.error) {
    throw new Error(jsonResult.error);
  }
  return jsonResult.shortenedUrl;
};
