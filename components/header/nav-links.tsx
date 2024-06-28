import Link from "next/link";
import { navLinks } from "@/constants";

export const NavLinks = () => {
  return (
    <nav>
      {navLinks.map((link) => {
        const IconComponent = link.icon;
        return (
          <Link
            className="sm:w-full sm:h-full"
            key={link.href}
            href={link.href}
            title={link.title}
            target={link.target || "_self"}
          >
            <IconComponent color={link.color} />
          </Link>
        );
      })}
    </nav>
  );
};
