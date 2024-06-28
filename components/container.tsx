import { cn } from "@/lib/utils";

interface IContainer {
  children?: React.ReactNode;
  className?: string;
}
export const Container = ({ children, className }: IContainer) => {
  return (
    <div className={cn("w-full mx-auto my-6 px-3 lg:px-0 ", className)}>
      {children}
    </div>
  );
};
