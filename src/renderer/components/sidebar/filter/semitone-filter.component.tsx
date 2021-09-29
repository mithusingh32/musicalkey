import * as React from 'react';
import { useDispatch } from 'react-redux';
import { updateSemitoneFilter } from '../../../store/audio-data/filter.slice';

interface CheckBoxes {
  [key: string]: any;
  one_semi: boolean;
  two_semi: boolean;
  three_semi: boolean;
}

const SemitoneFilter = ({ className = '' }: { className?: string }) => {
  const [checkedSemitones, setCheckedSemitones] = React.useState<CheckBoxes>({
    one_semi: false,
    two_semi: false,
    three_semi: false,
  });
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(updateSemitoneFilter(checkedSemitones));
  }, [checkedSemitones, dispatch]);

  const handleChange = ({ target }: { target: any }) => {
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
            case 'three_semi':
              checkboxLabel = '+/-3 Semitone';
              break;
            default:
              break;
          }

          return (
            <label htmlFor={key} key={key}>
              <input
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
