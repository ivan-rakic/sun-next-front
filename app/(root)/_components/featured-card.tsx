import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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
      <div
        className={cn(
          "mb-5 relative w-full aspect-video overflow-hidden",
          roundedImage && "rounded-2xl",
        )}
      >
        <Image fill className="object-cover" alt={title} src={imageSrc} />
      </div>
      <div className="flex justify-between mb-3 gap-4">
        <span className="font-medium text-xl max-w-md">{title}</span>
      </div>
      <Separator className="mb-3" />
      <span className="text-md text-muted-foreground">
        {author}. {category}.
      </span>
    </Link>
  );
};
