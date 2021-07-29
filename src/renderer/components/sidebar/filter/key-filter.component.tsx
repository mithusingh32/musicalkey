import * as React from 'react';

const KeyFilter = ({ className = '' }: { className?: string }) => {
  const keys = [
    'All',
    '1A',
    '2A',
    '3A',
    '4A',
    '5A',
    '6A',
    '7A',
    '8A',
    '9A',
    '10A',
    '11A',
    '12A',
    '1B',
    '2B',
    '3B',
    '4B',
    '5B',
    '6B',
    '7B',
    '8B',
    '9B',
    '10B',
    '11B',
    '12B',
  ];
  return (
    <div className={className}>
      <div className="mb-2 text-xl font-bold">Key:</div>
      <select className="w-16 text-center" name="key">
        {keys.map((key: string, index: number) => {
          const componentKey = `${key}-${index}`;
          return (
            <option
              className="mx-auto text-center"
              key={componentKey}
              value={key}
            >
              {key}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default KeyFilter;
