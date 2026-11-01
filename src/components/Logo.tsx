import { SITE } from "../data/site";

type LogoProps = {
  className?: string;
  alt?: string;
  /** "mark" zooms into the IC monogram only — for small sizes like the header */
  variant?: "full" | "mark";
};

export default function Logo({ className = "", alt = `${SITE.name} logo`, variant = "full" }: LogoProps) {
  if (variant === "mark") {
    return (
      <span className={`block overflow-hidden ${className}`}>
        {/* multiply blends the logo's white background into whatever light background sits behind it */}
        <img
          src={SITE.images.logo}
          alt={alt}
          width={400}
          height={400}
          className="aspect-square size-full origin-[46.5%_18%] scale-[1.75] object-cover mix-blend-multiply brightness-105 contrast-105"
        />
      </span>
    );
  }

  return (
    <img
      src={SITE.images.logo}
      alt={alt}
      width={400}
      height={400}
      className={`aspect-square object-cover ${className}`}
    />
  );
}
