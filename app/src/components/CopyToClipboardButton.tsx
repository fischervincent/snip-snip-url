import { useState } from "react";
import ClipboardCopyIcon from "../icons/ClipboardCopyIcon";

interface CopyToClipboardButtonProps {
  text: string;
}

export function CopyToClipboardButton({ text }: CopyToClipboardButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <ClipboardCopyIcon className="w-6 h-6 text-green-500 transition-colors duration-300" />
      ) : (
        <ClipboardCopyIcon className="w-6 h-6 transition-colors duration-300" />
      )}
    </button>
  );
}
