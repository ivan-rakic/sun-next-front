"use client";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import type { ReactNode } from "react";

import styles from "@/styles/components/content.module.scss";

type RichTextBlockProps = { body: unknown };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const hasTextChildren = (value: unknown): boolean =>
  Array.isArray(value) && value.every(isValidInlineNode);

const isValidInlineNode = (value: unknown): boolean => {
  if (!isRecord(value) || typeof value.type !== "string") return false;

  if (value.type === "text") return typeof value.text === "string";
  if (value.type === "link")
    return typeof value.url === "string" && hasTextChildren(value.children);
  if (value.type === "list-item") return hasTextChildren(value.children);

  return false;
};

const isValidBlockNode = (value: unknown): boolean => {
  if (!isRecord(value) || typeof value.type !== "string") return false;

  if (
    value.type === "paragraph" ||
    value.type === "quote" ||
    value.type === "code"
  )
    return hasTextChildren(value.children);
  if (value.type === "heading")
    return (
      typeof value.level === "number" &&
      value.level >= 1 &&
      value.level <= 6 &&
      hasTextChildren(value.children)
    );
  if (value.type === "list")
    return (
      (value.format === "ordered" || value.format === "unordered") &&
      Array.isArray(value.children) &&
      value.children.every(isValidBlockNode)
    );
  if (value.type === "image")
    return (
      isRecord(value.image) &&
      typeof value.image.url === "string" &&
      hasTextChildren(value.children)
    );

  return false;
};

const getSafeLink = (
  value: string,
): { href: string; external: boolean } | null => {
  try {
    const url = new URL(value, window.location.origin);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;

    return {
      href: url.toString(),
      external: url.origin !== window.location.origin,
    };
  } catch {
    return null;
  }
};

const RichTextLink = ({
  children,
  url,
}: {
  children?: ReactNode;
  url: string;
}) => {
  const safeLink = getSafeLink(url);

  if (!safeLink) return <>{children}</>;

  return (
    <a
      href={safeLink.href}
      target={safeLink.external ? "_blank" : undefined}
      rel={safeLink.external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
};

const isBlocksContent = (body: unknown): body is BlocksContent =>
  Array.isArray(body) && body.every(isValidBlockNode);

export const RichTextBlock = ({
  body,
}: RichTextBlockProps): React.ReactElement | null => {
  if (!isBlocksContent(body)) return null;

  return (
    <div className={styles.richText}>
      <BlocksRenderer content={body} blocks={{ link: RichTextLink } as never} />
    </div>
  );
};
