"use client";

import { useState } from "react";

import { ContentCard } from "@/components/templates/content-card";
import type { ContentKind, ContentListingResult } from "@/types/content";
import type { ListingContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n/config";
import type { FrontendDictionary } from "@/lib/i18n/dictionaries";
import { formatDate } from "@/lib/i18n/date";
import { localizedPath } from "@/lib/i18n/paths";
import styles from "@/styles/components/content-listing.module.scss";

type ContentListingProps = {
  kind: ContentKind;
  locale: Locale;
  initialResult: ContentListingResult<ListingContent>;
  dictionary: FrontendDictionary["listing"];
  readMoreLabel: string;
};

const PAGE_SIZE = 12;

export const ContentListing = ({
  kind,
  locale,
  initialResult,
  dictionary,
  readMoreLabel,
}: ContentListingProps): React.ReactElement => {
  const [items, setItems] = useState(initialResult.items);
  const [categories, setCategories] = useState(initialResult.categories);
  const [page, setPage] = useState(initialResult.pagination.page);
  const [pageCount, setPageCount] = useState(
    initialResult.pagination.pageCount,
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const requestPage = async (
    requestedPage: number,
    categorySlugs: string[],
  ): Promise<ContentListingResult<ListingContent>> => {
    const query = new URLSearchParams({
      locale,
      page: String(requestedPage),
      pageSize: String(requestedPage === 1 ? PAGE_SIZE : 8),
    });
    categorySlugs.forEach((slug) => query.append("category", slug));

    const response = await fetch(`/api/content/${kind}?${query}`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Content request failed");
    return (await response.json()) as ContentListingResult<ListingContent>;
  };

  const selectCategories = async (categorySlug?: string): Promise<void> => {
    const nextCategories = categorySlug
      ? selectedCategories.includes(categorySlug)
        ? selectedCategories.filter((slug) => slug !== categorySlug)
        : [...selectedCategories, categorySlug]
      : [];

    setSelectedCategories(nextCategories);
    setIsLoading(true);
    setHasError(false);

    try {
      const result = await requestPage(1, nextCategories);
      setItems(result.items);
      setCategories(result.categories);
      setPage(result.pagination.page);
      setPageCount(result.pagination.pageCount);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async (): Promise<void> => {
    if (isLoading || page >= pageCount) return;

    setIsLoading(true);
    setHasError(false);
    try {
      const nextPage = page + 1;
      const result = await requestPage(nextPage, selectedCategories);
      setItems((currentItems) => [...currentItems, ...result.items]);
      setCategories(result.categories);
      setPage(result.pagination.page);
      setPageCount(result.pagination.pageCount);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const renderCard = (
    item: ListingContent,
    variant: "featured" | "compact",
  ): React.ReactElement => (
    <ContentCard
      key={item.slug}
      href={localizedPath(locale, item.href)}
      imageSrc={item.imageSrc}
      imageAlt={item.imageAlt}
      category={item.category}
      categories={item.categories}
      title={item.title}
      description={item.description}
      meta={formatDate(item.date, locale)}
      readMoreLabel={readMoreLabel}
      variant={variant}
    />
  );

  return (
    <div className={styles.contentListing}>
      <div
        className={styles.contentFilters}
        role="group"
        aria-label={dictionary.filterLabel}
      >
        <button
          type="button"
          aria-pressed={selectedCategories.length === 0}
          className={
            selectedCategories.length === 0 ? styles.contentFilterActive : ""
          }
          onClick={() => void selectCategories()}
        >
          {dictionary.allCategories}
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            aria-pressed={selectedCategories.includes(category.slug)}
            className={
              selectedCategories.includes(category.slug)
                ? styles.contentFilterActive
                : ""
            }
            onClick={() => void selectCategories(category.slug)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {items.length > 0 ? (
        <>
          <section aria-label={dictionary.featuredHeading}>
            <div className={styles.contentFeaturedGrid}>
              {items.slice(0, 4).map((item) => renderCard(item, "featured"))}
            </div>
          </section>

          {items.length > 4 ? (
            <section
              className={styles.contentMore}
              aria-label={dictionary.moreHeading}
            >
              <div className={styles.contentCompactGrid}>
                {items.slice(4).map((item) => renderCard(item, "compact"))}
              </div>
            </section>
          ) : null}
        </>
      ) : (
        <p className={styles.contentMessage}>{dictionary.noResults}</p>
      )}

      {hasError ? (
        <p className={styles.contentMessage} role="alert">
          {dictionary.loadError}
        </p>
      ) : null}

      {page < pageCount ? (
        <div className={styles.contentLoadMore}>
          <button
            type="button"
            onClick={() => void loadMore()}
            disabled={isLoading}
          >
            {isLoading ? dictionary.loading : dictionary.loadMore}
          </button>
        </div>
      ) : null}
    </div>
  );
};
