import * as React from 'react';
import BaseLayout from '../../components/public/base-layout.component';
import { Sidebar } from '../../components/public/sidebar/sidebar.component';

export const Home = () => {
  return (
    <BaseLayout>
      <div className="">Hello</div>
      <Sidebar />
    </BaseLayout>
  );
};

export default Home;
