import Link from "next/link";
import { cn } from "@/lib/utils";
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
    <Link
      href={href}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground pl-2",
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );
}
