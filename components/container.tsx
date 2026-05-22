import type { ReactNode } from 'react';

import styles from '@/styles/reusable.module.scss';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export const Container = ({
  children,
  className = '',
}: ContainerProps): React.ReactElement => {
  return (
    <div className={`${styles.content_container} ${className}`}>
      {children}
    </div>
  );
};