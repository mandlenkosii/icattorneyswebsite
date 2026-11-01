import { SITE } from "../data/site";

/** "Ivirn Chauke" in serif with a gold italic "Inc" */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-serif leading-none ${className}`}>
      {SITE.wordmark} <em className="text-gold italic">{SITE.wordmarkSuffix}</em>
    </span>
  );
}
