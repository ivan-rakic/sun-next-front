import Link from "next/link";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";

interface MobileLinkProps extends PropsWithChildren {
  href: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export default function MobileLink({
  children,
  href,

  setIsOpen,
}: MobileLinkProps) {
  return (
    <Link href={href} onClick={() => setIsOpen(false)}>
      {children}
    </Link>
  );
}
