import * as React from "react";
import Link from "next/link";

type Props = {
  slug: string;
  label: string;
};
export const PodcastLink = ({ slug, label }: Props) => {
  return (
    <Link key={slug} id={slug} className="podcast" href={slug}>
      {label}
    </Link>
  );
};
