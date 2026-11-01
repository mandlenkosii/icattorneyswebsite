import { SITE } from "../data/site";

type SeoProps = {
  /** Page title; omit on the home page */
  title?: string;
  description: string;
  /** Route path, e.g. "/about" — used for canonical and og:url */
  path: string;
};

/**
 * Per-page <title>, description, canonical, Open Graph and Twitter tags.
 * React 19 hoists these elements into <head> automatically.
 */
export default function Seo({ title, description, path }: SeoProps) {
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} | Attorneys in Johannesburg`;
  const url = `${SITE.url}${path}`;
  const image = `${SITE.url}${SITE.images.share}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content="en_ZA" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
