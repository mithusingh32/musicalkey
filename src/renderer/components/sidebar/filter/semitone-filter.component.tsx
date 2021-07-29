import * as React from 'react';

const SemitoneFilter = ({ className = '' }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="mb-2 filter-label">Show +/- 1/2</div>
      <form className="flex flex-col">
        <label htmlFor="oneSemitone">
          <input className="mr-2" type="checkbox" id="oneSemitone" />
          -/+1 Semitone
        </label>
        <label htmlFor="twoSemitone">
          <input className="mt-2 mr-2" type="checkbox" id="twoSemitone" />
          -/+2 Semitone
        </label>
        <label htmlFor="threeSemitone">
          <input className="mt-2 mr-2" type="checkbox" id="threeSemitone" />
          -/+3 Semitone
        </label>
      </form>
    </div>
  );
};

export default SemitoneFilter;
