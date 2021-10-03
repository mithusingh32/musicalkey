/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
import _ from 'lodash';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { camelotChordNamesAndSemitones } from '../../../constants';
import useSize from '../../hooks/useSize.hook';
import { AudioData } from '../../interfaces/audio.interface';
import {
  NowPlaying,
  updateNowPlaying,
} from '../../store/now-playing/now-playing.slice';
import { RootState } from '../../store/store';
import ErrorModal from '../error-modal.component';
import Table from './table.component';

interface TableData {
  [index: number]: { id: string; key: string; doc: AudioData };
}

const AudioCollection = () => {
  const [tableData, setDataTable] = React.useState<TableData[]>([]);
  const [tableError, setTableError] = React.useState<{
    error: boolean;
    showModal: boolean;
  }>({ error: false, showModal: false });
  const [isLoading, setIsLoading] = React.useState('');
  const audioData = useSelector((state: RootState) => state.audioCollection);
  const filtering = useSelector((state: RootState) => state.audioFiltering);
  const dispatch = useDispatch();
  const tableRef = React.useRef(null);
  const size = useSize(tableRef); // Pass this to the Table Component to resize the header

  React.useEffect(() => {
    setIsLoading(audioData.isLoaded);
    if (audioData.isLoaded === 'loaded')
      setDataTable((oldState) => [...oldState, ...audioData.audioData]);
    else if (audioData.isLoaded === 'error')
      // TODO Need to test by forcing database error.
      setTableError({ error: true, showModal: true });
  }, [audioData]);

  const data = React.useMemo(() => {
    // TODO: Find a better to chain these
    // The filtering is done in multiple steps:
    // 1. Filter for key and semitones
    // 2. Filter for BPM
    // 3. Filter by string
    const keyFiltered = _.filter(
      tableData,
      (audioEntry: { id: string; key: string; doc: AudioData }) => {
        const key = filtering.keyFilter;
        // Return all entried if no key is selected
        if (key === 'All') return audioEntry;

        // TODO Handle semitone filtering in a better way. This is such a mess.
        // The issue I ran into was if I just enabled semitone filtering it would only populate the semitones'
        // and not the key itself. (Example: if I select key as 1A, and select +/-1 semitone, only the -/+1 semitone
        // will show up.)

        // Return +/- 1 Semitones if checked
        if (filtering.semitoneFilter?.one_semi && key !== undefined) {
          return (
            audioEntry.doc.camelotWheelKey === key ||
            audioEntry.doc.camelotWheelKey ===
              camelotChordNamesAndSemitones[key].plus_one ||
            audioEntry.doc.camelotWheelKey ===
              camelotChordNamesAndSemitones[key].minus_one
          );
        }

        // Return +/- 2 Semitones if checked
        if (filtering.semitoneFilter?.two_semi && key !== undefined) {
          return (
            audioEntry.doc.camelotWheelKey === key ||
            audioEntry.doc.camelotWheelKey ===
              camelotChordNamesAndSemitones[key].plus_two ||
            audioEntry.doc.camelotWheelKey ===
              camelotChordNamesAndSemitones[key].minus_two
          );
        }

        // Return +/1 & 2
        if (
          filtering.semitoneFilter?.one_semi &&
          filtering.semitoneFilter?.two_semi &&
          key !== undefined
        ) {
          return (
            audioEntry.doc.camelotWheelKey === key ||
            audioEntry.doc.camelotWheelKey ===
              camelotChordNamesAndSemitones[key].plus_one ||
            audioEntry.doc.camelotWheelKey ===
              camelotChordNamesAndSemitones[key].minus_one ||
            audioEntry.doc.camelotWheelKey ===
              camelotChordNamesAndSemitones[key].plus_two ||
            audioEntry.doc.camelotWheelKey ===
              camelotChordNamesAndSemitones[key].minus_two
          );
        }

        // Return only the selected key
        return audioEntry.doc.camelotWheelKey === key;
      }
    );

    // Filter for BPM range
    const bpmFilter = _.filter(
      keyFiltered,
      (audioEntry: { id: string; key: string; doc: AudioData }) => {
        if (
          filtering.BPM_Range.enable &&
          filtering.BPM_Range?.start !== undefined &&
          filtering.BPM_Range?.end !== undefined
        ) {
          // if the bpm is a string, convert to float before doing comparisonI
          if (typeof audioEntry.doc.bpm === 'string') {
            return (
              parseFloat(audioEntry.doc.bpm) >= filtering.BPM_Range?.start &&
              parseFloat(audioEntry.doc.bpm) <= filtering.BPM_Range?.end
            );
          }
          return (
            audioEntry.doc.bpm >= filtering.BPM_Range?.start &&
            audioEntry.doc.bpm <= filtering.BPM_Range?.end
          );
        }
        return audioEntry;
      }
    );

    // Filter on search field
    // TODO: Add fuzzy search?
    const finalFilter = _.filter(
      bpmFilter,
      (audioEntry: { id: string; key: string; doc: AudioData }) => {
        return (
          audioEntry.doc.title.includes(filtering.stringFilter) ||
          audioEntry.doc.artist.includes(filtering.stringFilter)
        );
      }
    );
    return finalFilter;
  }, [tableData, filtering]);

  // This method is passed to the Table to update the currently playing song when the user
  // double clicks on a track inside the table
  const dispatchNowPlaying = (selectedAudio: AudioData) => {
    const newNowPlaying: NowPlaying = {
      audioTrack: selectedAudio,
      isPlaying: true,
      isLoaded: 'loading',
    };
    dispatch(updateNowPlaying(newNowPlaying));
  };
  // TODO Fix  scroll bars and scrolling w/ header. Header is not scrolling at all
  return (
    <div
      className="w-screen pb-32 overflow-y-scroll bg-gray"
      style={{ paddingLeft: '18em' }}
      ref={tableRef}
    >
      {isLoading === 'pending' ? (
        <svg
          className="w-24 h-24 mx-auto my-24 text-gray-900 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <></>
      )}
      {isLoading === 'loaded' ? (
        <div className="overflow-auto">
          <Table
            data={data}
            tableSize={size}
            updateNowPlaying={dispatchNowPlaying}
          />
        </div>
      ) : (
        <></>
      )}
      {tableError.error && tableError.showModal ? (
        <ErrorModal
          errorTitle="Database Error"
          errorMessage="Error fetching data from data from local database. Restart application. If error presists, report to <TODO>"
          action={{
            actionText: 'Restart',
            action: () => {
              // TODO: Restart application or retry fetching data
              setTableError((oldState) => {
                return {
                  ...oldState,
                  showModal: !oldState.showModal,
                };
              });
            },
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default AudioCollection;
