import Link from "next/link";

type Props = {
  className: string;
  href?: string;
};
export const LogoLink = ({ className, href = "/" }: Props) => {
  return (
    <div className={className}>
      <Link href={href} />
    </div>
  );
};
