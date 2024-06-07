type Props = {
  title: string;
  content: string;
  style?: string;
};
export const FooterSection = ({ title, content, style }: Props) => {
  return (
    <section>
      <h4 className={style}>{title}</h4>
      <p>{content}</p>
    </section>
  );
};
