import * as React from 'react';
import { ipcRenderer } from 'electron';
import BaseLayout from '../components/base-layout.component';
import Sidebar from '../components/sidebar/sidebar.component';
import Footer from '../components/footer/footer.component';

export const Home = () => {
  React.useEffect(() => {
    const audioDataFromDatabase = ipcRenderer
      .invoke('getAllDocs')
      .then((result) => {
        return result;
      })
      .catch((err) => err);
    console.log(audioDataFromDatabase);
  }, []);
  return (
    <BaseLayout>
      <Sidebar />
      <Footer />
    </BaseLayout>
  );
};

export default Home;
