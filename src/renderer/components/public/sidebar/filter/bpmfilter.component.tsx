import * as React from 'react';

const Range = ({
  className = '',
  onChange,
  name,
  startingValue,
}: {
  className?: string;
  onChange: (inNum: number) => void;
  name: string;
  startingValue: number;
}) => {
  return (
    <select
      className={className}
      name={name}
      id={name}
      value={startingValue}
      onChange={(event) => {
        onChange(parseInt(event.target.value, 10));
      }}
    >
      {[...Array(21).keys()].slice(1).map((i, index: number) => {
        const bpmkey = `${name}-${index}`;
        return (
          <option
            className="mx-auto text-center"
            key={bpmkey}
            value={i * 10}
            id={name}
          >
            {i * 10}
          </option>
        );
      })}
    </select>
  );
};

export const BPMRangeFilter = ({ className = '' }: { className?: string }) => {
  const [minBPM, setMinBPM] = React.useState<number>(70);
  const [maxBPM, setMaxBPM] = React.useState<number>(160);

  return (
    <div className={className}>
      <div className="mb-2 text-xl font-bold">BPM Range:</div>
      <form>
        <Range name="minBPM" startingValue={minBPM} onChange={setMinBPM} />
        <span className="mx-2">-</span>
        <Range name="maxBPM" startingValue={maxBPM} onChange={setMaxBPM} />
      </form>
    </div>
  );
};

export default 'BPMRangeFilter';
