import * as React from 'react';
import { useDispatch } from 'react-redux';
import BaseLayout from '../components/base-layout.component';
import Sidebar from '../components/sidebar/sidebar.component';
import Footer from '../components/footer/footer.component';
import AudioCollection from '../components/audio-collection/audio-collection.component';
import { fetchAudioData } from '../store/audio-data/fetch-data.slice';

export const Home = () => {
  const dispatch = useDispatch();
  dispatch(fetchAudioData());
  return (
    <BaseLayout>
      <div className="flex">
        <Sidebar />
        <AudioCollection />
      </div>
      <Footer />
    </BaseLayout>
  );
};

export default Home;
