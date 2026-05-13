"use client";

import { Fragment, useState } from "react";

import { links } from "@/constants";
import MobileLink from "@/components/header/mobile-link";
import { NavLinks } from "@/components/header/nav-links";
import styles from "@/styles/header.module.scss";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="lg:hidden pl-5 pt-1">
      {/* <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
          >
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pt-2 flex flex-col pb-3">
          <SheetHeader className="">
            <SheetTitle>Sun Radio</SheetTitle>
          </SheetHeader>
          <div className="my-4 flex flex-col gap-4 pb-10 pl-1 pr-4">
            {links.map((item) => (
              <Fragment key={item.href}>
                <MobileLink href={item.href} setIsOpen={setIsOpen}>
                  {item.label}
                </MobileLink>
              </Fragment>
            ))}
            <div className={styles.header_main__mobile__socials}>
              {<NavLinks />}
            </div>
          </div>
        </SheetContent>
      </Sheet> */}
    </div>
  );
};
