import * as React from 'react';
import { useDispatch } from 'react-redux';
import { updateBPMFilter } from '../../../store/audio-data/filter.slice';

const Range = ({
  className = '',
  onChange,
  name,
  value,
  enabled,
}: {
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  value: number | undefined;
  enabled: boolean;
}) => {
  return (
    <select
      className={className}
      name={name}
      id={name}
      value={enabled ? value : 0}
      onChange={(event) => {
        onChange(event);
      }}
      disabled={!enabled}
    >
      {[...Array(21).keys()].slice(0).map((i, index: number) => {
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

const BPMRangeFilter = ({ className = '' }: { className?: string }) => {
  const [minBPM, setMinBPM] = React.useState<number | undefined>(70);
  const [maxBPM, setMaxBPM] = React.useState<number | undefined>(160);
  const [enableBPMFilter, setEnableBPMFilter] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const bpmRange = { enable: enableBPMFilter, start: minBPM, end: maxBPM };
    dispatch(updateBPMFilter(bpmRange));
  }, [enableBPMFilter, minBPM, maxBPM, dispatch]);

  const handleMinBPM = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentValue = parseFloat(e.target.value);
    setMinBPM(currentValue);
    if (maxBPM && currentValue > maxBPM) {
      setMaxBPM(currentValue + 10);
    }
  };

  const handleMaxBPM = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentValue = parseFloat(e.target.value);
    setMaxBPM(currentValue);
    if (minBPM && currentValue < minBPM) {
      setMinBPM(currentValue - 10);
    }
  };

  const handleEnableBPMFilter = () => {
    setEnableBPMFilter(!enableBPMFilter);
    if (!enableBPMFilter) {
      setMinBPM(10);
      setMaxBPM(200);
    }
  };

  return (
    <div className={className}>
      <div className="mb-2 text-xl font-bold">BPM Range:</div>
      <form>
        <Range
          name="minBPM"
          onChange={handleMinBPM}
          value={minBPM}
          enabled={enableBPMFilter}
        />
        <span className="mx-2">-</span>
        <Range
          name="maxBPM"
          value={maxBPM}
          onChange={handleMaxBPM}
          enabled={enableBPMFilter}
        />
        <button type="button" className="ml-4" onClick={handleEnableBPMFilter}>
          {enableBPMFilter ? 'Disable BPM Filter' : 'Enable BPM Filter'}
        </button>
      </form>
    </div>
  );
};

export default BPMRangeFilter;
