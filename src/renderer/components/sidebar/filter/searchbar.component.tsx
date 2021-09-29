import * as React from 'react';
import { useDispatch } from 'react-redux';
import { updateStringFilter } from '../../../store/audio-data/filter.slice';

const SearchBar = ({ className = '' }: { className?: string }) => {
  const dispatch = useDispatch();

  return (
    <div className={`${className} flex`}>
      <input
        className="w-3/4 p-1 mx-auto mb-2 rounded-lg"
        type="text"
        placeholder="Search..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(updateStringFilter(e.target.value));
        }}
      />
    </div>
  );
};

export default SearchBar;
