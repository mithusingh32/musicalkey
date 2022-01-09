import * as React from 'react';
import '../../../../../assets/styles/sidebar.style.scss';

import KeyFilter from './key-filter.component';
import BPMRangeFilter from './bpmfilter.component';
import SearchBar from './searchbar.component';
import SemitoneFilter from './semitone-filter.component';

const Filter: React.FC = () => {
  return (
    <div className="relative flex flex-col bg-gray-500 h-52 ">
      <SemitoneFilter className="absolute top-0 right-0 mr-5" />
      <KeyFilter className="pl-2" />
      <BPMRangeFilter className="pl-2 my-4" />
      <SearchBar className="absolute bottom-0 self-center w-full p-2" />
    </div>
  );
};

export default Filter;
