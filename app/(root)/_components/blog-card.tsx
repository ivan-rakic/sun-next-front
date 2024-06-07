import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LucideMoveUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  title: string;
  date?: string;
  author: string;
  timeToRead?: string;
  imageSrc: string;
  roundedImage?: boolean;
};
export const BlogCard = ({
  title,
  date,
  author,
  timeToRead,
  imageSrc,
  roundedImage = false,
  slug,
}: Props) => {
  return (
    <Link href={`/blog/${slug}`} className="w-full">
      <div
        className={cn(
          "mb-5 relative w-full aspect-video  overflow-hidden",
          roundedImage && "rounded-2xl",
        )}
      >
        <Image fill className="object-cover" alt={title} src={imageSrc} />
      </div>
      <div className="flex justify-between mb-3 gap-4">
        <span className="font-medium text-xl  max-w-md">{title}</span>
        <Button
          className="rounded-full p-2 flex items-center justify-center"
          variant="outline"
        >
          <LucideMoveUpRight className="text-xs text-muted-foreground" />
        </Button>
      </div>
      <Separator className="mb-3" />
      <span className="text-md text-muted-foreground">
        {author}. {timeToRead}.
      </span>
    </Link>
  );
};
