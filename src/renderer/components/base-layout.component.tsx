import * as React from 'react';

interface IProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: IProps) => {
  return <main className="flex w-screen h-screen">{children}</main>;
};

export default BaseLayout;
