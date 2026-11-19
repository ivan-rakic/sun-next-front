"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { localeLabels, locales, type Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import styles from "@/styles/navigation/header.module.scss";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
};

export const LanguageSwitcher = ({
  locale,
  label,
}: LanguageSwitcherProps): React.ReactElement => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams?.toString() ?? "";
  const currentPath = pathname ?? "/";

  return (
    <nav className={styles.languageSwitcher} aria-label={label}>
      {locales.map((candidate) => {
        const href = `${localizedPath(candidate, currentPath)}${query ? `?${query}` : ""}`;

        return (
          <a
            key={candidate}
            href={href}
            aria-current={candidate === locale ? "true" : undefined}
          >
            {localeLabels[candidate]}
          </a>
        );
      })}
    </nav>
  );
};
