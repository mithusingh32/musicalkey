import * as React from 'react';
import BaseLayout from '../components/base-layout.component';
import Sidebar from '../components/sidebar/sidebar.component';
import Footer from '../components/footer/footer.component';

export const Home = () => {
  return (
    <BaseLayout>
      <Sidebar />
      <Footer />
    </BaseLayout>
  );
};

export default Home;
