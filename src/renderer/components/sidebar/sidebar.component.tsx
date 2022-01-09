import * as React from 'react';
import Filter from './filter/filter.component';
import Playlists from './playlist/playlist.component';

const Sidebar = () => {
  return (
    <div
      className="absolute bottom-0 left-0 h-screen pb-24 bg-gray-200 select-none"
      style={{ width: '18em' }}
    >
      <Filter />
      <Playlists />
    </div>
  );
};

export default Sidebar;
