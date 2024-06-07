import * as React from 'react'
import Link from "next/link";
import {getIconComponent} from "@/lib/utils";

type Props = {
    slug: string,
    label :string
};
export const PodcastLink = ({slug,label}: Props) => {
    const IconComponent = getIconComponent(slug);
    return (
        <Link key={slug} id={slug} className="podcast" href={slug}>
            {IconComponent && <IconComponent />} {label}
        </Link>
    );
};
