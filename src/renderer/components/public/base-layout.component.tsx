import * as React from 'react';

interface IProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: IProps) => {
  return <main>{children}</main>;
};

export default BaseLayout;
