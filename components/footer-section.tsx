type Props = {
  title: string;
  content: string;
  style?: string;
};

export const FooterSection = ({
  title,
  content,
  style,
}: Props): React.ReactElement => {
  return (
    <section className={style}>
      <h4>{title}</h4>
      <p>{content}</p>
    </section>
  );
};