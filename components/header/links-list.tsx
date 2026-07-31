import { mainLinks } from "@/constants";
import Link from "next/link";

export const LinksList = () => {
  return (
    <>
      {mainLinks.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </>
  );
};
