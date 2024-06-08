import {ReactNode} from "react";

type Props = { children: ReactNode, title: string; isHidden: boolean, className?: string};
export const PlayerButton = ({ children, title, isHidden, className }: Props) => {
  return (
    <button
      title={title}
      style={{ display: isHidden ? "none" : "block" }}
      className={className}
    >
        {children}
    </button>
  );
};
