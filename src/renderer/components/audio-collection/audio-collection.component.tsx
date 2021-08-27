/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */

import { ipcRenderer } from 'electron';
import * as React from 'react';
import useSize from '../../hooks/useSize.hook';
import { AudioData } from '../../interfaces/audio.interface';
import Table from './table.component';

interface TableData {
  [index: number]: { id: string; key: string; doc: AudioData };
}

const AudioCollection = () => {
  const [tableData, setDataTable] = React.useState<TableData[]>([]);

  const tableRef = React.useRef(null);
  const size = useSize(tableRef); // Pass this to the Table Component to resize the header

  // TODO: Move fetching all the docs from the database to redux store
  React.useEffect(() => {
    ipcRenderer
      .invoke('getAllDocs')
      .then((result) => {
        setDataTable((oldData) => [...oldData, ...result.rows]);
        return result;
      })
      .catch((err) => err);
  }, []);

  const data = React.useMemo(() => {
    return tableData;
  }, [tableData]);

  return (
    <div
      className="w-screen pb-32 overflow-y-scroll bg-gray"
      style={{ paddingLeft: '18em' }}
      ref={tableRef}
    >
      {tableData === [] && !data ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-auto">
          <Table data={data} tableSize={size} />
        </div>
      )}
    </div>
  );
};

export default AudioCollection;
