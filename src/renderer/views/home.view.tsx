import * as React from 'react';
import BaseLayout from '../components/base-layout.component';
import Sidebar from '../components/sidebar/sidebar.component';
import Footer from '../components/footer/footer.component';
import AudioCollection from '../components/audio-collection/audio-collection.component';

export const Home = () => {
  return (
    <BaseLayout>
      <div className="flex w-screen">
        <Sidebar />
        <AudioCollection />
      </div>
      <Footer />
    </BaseLayout>
  );
};

export default Home;
