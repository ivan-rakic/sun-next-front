'use client';

import { Menu } from 'lucide-react';
import { Fragment, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {links} from "@/constants";
import MobileLink from "@/components/header/mobile-link";
import {NavLinks} from "@/components/header/nav-links";
import styles from "@/styles/header.module.scss";

export const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="lg:hidden pl-5 pt-1">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        size="icon"
                        variant="outline"
                        className={cn(
                            'rounded-full p-2  duration-300 ease-in-out text-white border-white',
                        )}
                    >
                        <Menu className="size-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="pt-2 flex flex-col pb-3">
                    <SheetHeader className="">
                        <SheetTitle>
                            Sun Radio
                        </SheetTitle>
                    </SheetHeader>
                    <div className="my-4 flex flex-col gap-4 pb-10 pl-1 pr-4">
                        {links.map((item) => (
                            <Fragment key={item.href}>
                                <MobileLink
                                    href={item.href}
                                    setIsOpen={setIsOpen}
                                >
                                    {item.label}
                                </MobileLink>
                            </Fragment>
                        ))}
                        <div className={styles.header_main__mobile__socials}>
                            {<NavLinks/>}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};
