import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
  isHidden: boolean;
  className?: string;
  onClick?: () => void;
};

export const PlayerButton = ({
  children,
  title,
  isHidden,
  className,
  onClick,
}: Props): React.ReactElement => {
  return (
    <button
      type="button"
      title={title}
      hidden={isHidden}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};