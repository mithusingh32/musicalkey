import * as React from 'react';

const SearchBar = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`${className} flex`}>
      <input
        className="w-3/4 p-1 mx-auto mb-2 rounded-lg"
        type="text"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
