import Link from "next/link";

type Props = {
  slug: string;
  title: string;
  author: string;
  category?: string;
};
export const FeaturedCard = ({ title, author, category, slug }: Props) => {
  return (
    <Link href={`/blog/${slug}`} className="kobas">
      <div className="flex justify-between mb-3 gap-4">
        <span className="font-medium text-xl max-w-md">{title}</span>
      </div>
      <span className="text-md text-muted-foreground">
        {author}. {category}.
      </span>
    </Link>
  );
};
