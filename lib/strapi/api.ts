import type {
  StrapiArticle,
  StrapiCollectionResponse,
  StrapiHeader,
  StrapiNews,
  StrapiPodcast,
  StrapiSingleResponse,
} from '@/types/strapi';

import { strapiFetch } from './client';

// One function per Strapi content-type endpoint. `populate=*` keeps this
// simple for now (fetches all relations/media in one go); swap for an
// explicit populate list once the schema is finalized.

export const fetchArticles = () =>
  strapiFetch<StrapiCollectionResponse<StrapiArticle>>('/articles', { populate: '*' });

export const fetchArticleBySlug = (slug: string) =>
  strapiFetch<StrapiCollectionResponse<StrapiArticle>>('/articles', {
    'filters[slug][$eq]': slug,
    populate: '*',
  });

export const fetchNews = () =>
  strapiFetch<StrapiCollectionResponse<StrapiNews>>('/news-articles', { populate: '*' });

export const fetchNewsBySlug = (slug: string) =>
  strapiFetch<StrapiCollectionResponse<StrapiNews>>('/news-articles', {
    'filters[slug][$eq]': slug,
    populate: '*',
  });

export const fetchPodcasts = () =>
  strapiFetch<StrapiCollectionResponse<StrapiPodcast>>('/podcasts', { populate: '*' });

export const fetchPodcastBySlug = (slug: string) =>
  strapiFetch<StrapiCollectionResponse<StrapiPodcast>>('/podcasts', {
    'filters[slug][$eq]': slug,
    populate: '*',
  });

// Single type — one record for the whole site, no slug/filtering needed.
export const fetchHeader = () =>
  strapiFetch<StrapiSingleResponse<StrapiHeader>>('/header', { populate: '*' });
