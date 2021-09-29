import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSemitoneFilter } from '../../../store/audio-data/filter.slice';
import { RootState } from '../../../store/store';

interface CheckBoxes {
  [key: string]: any;
  one_semi: boolean;
  two_semi: boolean;
}

const SemitoneFilter = ({ className = '' }: { className?: string }) => {
  const keyFilter = useSelector(
    (state: RootState) => state.audioFiltering.keyFilter
  );
  const [checkedSemitones, setCheckedSemitones] = React.useState<CheckBoxes>({
    one_semi: false,
    two_semi: false,
  });
  const dispatch = useDispatch();

  // Dispatch to redux when checkbox state changes
  React.useEffect(() => {
    dispatch(updateSemitoneFilter(checkedSemitones));
  }, [checkedSemitones, dispatch]);

  // Clear out the checked which will update redux
  React.useEffect(() => {
    if (keyFilter === 'All') {
      setCheckedSemitones({
        one_semi: false,
        two_semi: false,
      });
    }
  }, [keyFilter]);

  const handleChange = ({
    target,
  }: {
    target: EventTarget & HTMLInputElement;
  }) => {
    setCheckedSemitones((oldState) => ({
      ...oldState,
      [target.name]: !oldState[target.name],
    }));
  };

  return (
    <div className={className}>
      <div className="mb-2 filter-label">Show Semitones</div>
      <form className="flex flex-col">
        {Object.keys(checkedSemitones).map((key) => {
          let checkboxLabel = '';
          switch (key) {
            case 'one_semi':
              checkboxLabel = '+/-1 Semitone';
              break;
            case 'two_semi':
              checkboxLabel = '+/-2 Semitone';
              break;
            default:
              break;
          }

          return (
            <label htmlFor={key} key={key}>
              <input
                disabled={keyFilter === 'All'}
                onChange={handleChange}
                className="mr-2"
                type="checkbox"
                id={key}
                name={key}
                checked={checkedSemitones[key]}
              />
              {checkboxLabel}
            </label>
          );
        })}
      </form>
    </div>
  );
};

export default SemitoneFilter;
