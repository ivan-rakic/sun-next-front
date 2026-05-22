import * as React from "react";
import Link from "next/link";

type Props = {
  slug: string;
  label: string;
};
export const NavigationMenu = ({ slug, label }: Props) => {
  return (
    <Link key={slug} id={slug} className="podcast" href={slug}>
      {label}
    </Link>
  );
};
