import {cn} from "@/lib";

interface IContainer {
    children?: React.ReactNode;
    className?: string;
}
export const Container = ({ children, className }: IContainer) => {
    return (
        <div
            className={cn(
                'max-w-6xl w-full mx-auto my-6 lg:my-16 px-3 lg:px-0 ',
                className
            )}
        >
            {children}
        </div>
    );
};
