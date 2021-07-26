import * as React from 'react';
import { Filter } from './filter/filter.component';

export const Sidebar = () => {
  return (
    <div
      className="absolute bottom-0 left-0 h-screen bg-gray-200"
      style={{ width: '18em' }}
    >
      <Filter />
    </div>
  );
};

export default 'Sidebar';
