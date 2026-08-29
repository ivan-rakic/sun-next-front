import { articles, news, PODCASTS } from '@/constants';
import type { ArticleContent, NewsContent, PodcastContent } from '@/types/content';

import { normalizeArticle, normalizeNews, normalizePodcast } from './normalize';

// Data-access seam: swap the internals of these functions for real Strapi
// `fetch` calls once the CMS is wired up. Callers (pages/templates) only
// ever deal with the normalized domain types, so nothing else has to change.

export const getArticles = (): ArticleContent[] => articles.map(normalizeArticle);

export const getArticleBySlug = (slug: string): ArticleContent | undefined =>
  getArticles().find((article) => article.slug === slug);

export const getNews = (): NewsContent[] => news.map(normalizeNews);

export const getNewsBySlug = (slug: string): NewsContent | undefined =>
  getNews().find((item) => item.slug === slug);

export const getPodcasts = (): PodcastContent[] => PODCASTS.map(normalizePodcast);

export const getPodcastBySlug = (slug: string): PodcastContent | undefined =>
  getPodcasts().find((podcast) => podcast.slug === slug);
