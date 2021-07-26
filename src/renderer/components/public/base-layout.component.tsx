import * as React from 'react';

interface IProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: IProps) => {
  return <main className="static flex w-full h-full">{children}</main>;
};

export default BaseLayout;
