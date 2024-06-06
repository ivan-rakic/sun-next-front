import {links} from "@/constants";
import Link from "next/link";


export const LinksList = () => {
    return (
        <>
            {links.map((link) => (
                <Link key={link.href} href={link.href}>
                    {link.label}
                </Link>
            ))}
        </>
    );
};
