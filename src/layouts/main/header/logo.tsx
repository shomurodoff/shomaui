import { Link } from "@tanstack/react-router";

const Logo = () => {
  return (
    <Link
      to="/"
      aria-label="SHOMAUI home"
      className="flex shrink-0 items-center gap-2"
    >
      <img src="/logo.png" alt="SHOMAUI logo" className="size-8" />
      <span className="font-heading text-sm font-semibold tracking-[0.2em]">
        SHOMAUI
      </span>
    </Link>
  );
};

export default Logo;
