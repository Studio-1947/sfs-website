import Image from "next/image";
import Link from "next/link";

const ASPECT = 474 / 221;

export default function Logo({
  href = "/",
  size = 40,
  light = false,
  iconOnly = false,
  subtitle = true,
  responsiveText = false,
}: {
  href?: string;
  size?: number;
  light?: boolean;
  iconOnly?: boolean;
  subtitle?: boolean;
  responsiveText?: boolean;
}) {
  return (
    <Link href={href} className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
      <Image
        src="/logo-icon.svg"
        alt="Schools for Skills"
        width={size * ASPECT}
        height={size}
        style={{ height: size, width: "auto" }}
        priority
      />
      {iconOnly ? (
        <span className="sr-only">Schools for Skills</span>
      ) : (
        <span
          className={`${
            responsiveText ? "hidden sm:flex" : "flex"
          } flex-col leading-tight ${light ? "text-white" : "text-brand-black dark:text-white"}`}
        >
          <span className="font-semibold" style={{ fontSize: size * 0.48 }}>
            Schools for Skills
          </span>
          {subtitle ? (
            <span
              className={light ? "text-white/70" : "text-brand-gray dark:text-white/60"}
              style={{ fontSize: size * 0.39 }}
            >
              Allied Health Sciences
            </span>
          ) : null}
        </span>
      )}
    </Link>
  );
}
