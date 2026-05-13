interface IContainer {
  children?: React.ReactNode;
  className?: string;
}
export const Container = ({ children, className }: IContainer) => {
  return (
    <div>
      {children}
    </div>
  );
};
