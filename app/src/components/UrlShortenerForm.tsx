import { useState } from "react"
import LinkIcon from "../icons/LinkIcon"
import ArrowRightIcon from "../icons/ArrowRightIcon"
import CheckMarkIcon from "../icons/CheckMarkIcon"
import { throwIfInvalidUrl } from "./throwIfInvalidUrl"
import { postUrlToShorten } from "./postUrlToShorten";
import { CopyToClipboardButton } from "./CopyToClipboardButton";

export function UrlShortenerForm() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      throwIfInvalidUrl(url);

      const result = await postUrlToShorten(url);
      setShortUrl(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to shorten URL");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <label htmlFor="url" className="text-white text-xl font-medium">
            Enter your long URL
          </label>
          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400" />
              <input
                id="url"
                type="text"
                placeholder="https://example.com/very/long/url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-12 h-16 text-lg bg-white/90 border-blue-300 focus-visible:ring-blue-200 rounded-xl"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="h-16 px-8 text-lg bg-white text-[#1362dd] hover:bg-blue-50 hover:text-[#1362dd] rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              {isLoading ? "Shortening..." : "Shorten"}
              {!isLoading && <ArrowRightIcon className="h-5 w-5" />}
            </button>
          </div>
          {error && (
            <p className="text-base text-red-200 font-medium">{error}</p>
          )}
        </div>
      </form>
      {shortUrl && !error && (
        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-1">
            <CheckMarkIcon className="h-10 w-10 text-green-400" />
            <label className="text-white text-xl font-bold">
              Your tiny url
            </label>
          </div>
          <div className="relative w-full">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="w-full pl-4 h-16 text-lg bg-white/90 border-blue-300 focus-visible:ring-blue-200 rounded-xl"
            />
            <CopyToClipboardButton text={shortUrl} />
          </div>
        </div>
      )}
    </div>
  );
}
