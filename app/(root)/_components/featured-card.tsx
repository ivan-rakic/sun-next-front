import Link from "next/link";
import Image from "next/image";

type Props = {
  slug: string;
  title: string;
  date?: string;
  author: string;
  category?: string;
  imageSrc: string;
  isPrimary: boolean;
  roundedImage?: boolean;
};
export const FeaturedCard = ({
  title,
  date,
  author,
  category,
  imageSrc,
  roundedImage = false,
  isPrimary,
  slug,
}: Props) => {
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
