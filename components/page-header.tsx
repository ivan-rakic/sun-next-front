import Link from 'next/link';

import styles from '@/styles/components/page-header.module.scss';

type PageHeaderAction = {
  href: string;
  label: string;
  external?: boolean;
};

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: PageHeaderAction;
};

export const PageHeader = ({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps): React.ReactElement => {
  return (
    <section className={styles.pageHeader}>
      <div>
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>

      {action ? (
        <Link
          href={action.href}
          target={action.external ? '_blank' : undefined}
          rel={action.external ? 'noopener noreferrer' : undefined}
        >
          {action.label}{' ->'}
        </Link>
      ) : null}
    </section>
  );
};
