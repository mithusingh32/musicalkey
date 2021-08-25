/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
import { ipcRenderer } from 'electron';
import * as React from 'react';
import { useTable, useSortBy, Column } from 'react-table';
import { AudioData } from '../../interfaces/audio.interface';

interface TableData {
  [index: number]: { id: string; key: string; doc: AudioData };
}

const AudioCollection = () => {
  const [tableData, setDataTable] = React.useState<TableData[]>([]);
  React.useEffect(() => {
    ipcRenderer
      .invoke('getAllDocs')
      .then((result) => {
        setDataTable((oldData) => [...oldData, ...result.rows]);
        return result;
      })
      .catch((err) => err);
  }, []);

  const columns = React.useMemo<Column<TableData>[]>(
    () => [
      {
        id: 'id',
        Header: 'ID',
        accessor: (originalRow: any) => originalRow.id,
      },
      {
        id: 'key',
        Header: 'key',
        accessor: (originalRow: any) => originalRow.key,
      },
      {
        id: 'error',
        Header: 'Error',
        accessor: (originalRow: any) => originalRow.doc.error,
      },
      {
        id: 'location',
        Header: 'Location',
        accessor: (originalRow: any) => originalRow.doc.location,
      },
      {
        id: 'artist',
        Header: 'Artist',
        accessor: (originalRow: any) => originalRow.doc.artist,
      },
      {
        id: 'title',
        Header: 'Title',
        accessor: (originalRow: any) => originalRow.doc.title,
        minWidth: 200,
      },
      {
        id: 'album',
        Header: 'Album',
        accessor: (originalRow: any) => originalRow.doc.album,
      },
      {
        id: 'length',
        Header: 'length',
        accessor: (originalRow: any) => originalRow.doc.length,
      },
      {
        id: 'camelotWheelKey',
        Header: 'Key',
        accessor: (originalRow: any) =>
          `${originalRow.doc.camelotWheelKey}-${originalRow.doc.chordName}`,
        minWidth: 100,
      },
      {
        id: 'chordName',
        Header: 'chordName',
        accessor: (originalRow: any) => originalRow.doc.chordName,
      },
      {
        id: 'bpm',
        Header: 'BPM',
        accessor: (originalRow: any) => originalRow.doc.bpm,
      },
    ],
    []
  );

  const data = React.useMemo(() => {
    return tableData;
  }, [tableData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: {
          hiddenColumns: ['id', 'key', 'location', 'error', 'chordName'],
        },
      },
      useSortBy
    );

  const Table = () => {
    return (
      <table
        className="min-w-full divide-y divide-gray-200"
        {...getTableProps()}
      >
        <thead className="">
          {headerGroups.map((headerGroup: any) => (
            <tr className="" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{ position: 'sticky' }}
                  className="sticky top-0 px-6 py-2 font-medium tracking-wider text-center text-gray-500 uppercase cursor-pointer bg-gray-50"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any, index: number) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={`
                hover:bg-gray-200
                cursor-default ${
                  index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-400'
                }`}
                onDoubleClick={() => {
                  // Update now playing on double click
                }}
              >
                {row.cells.map((cell: any) => {
                  return (
                    <td
                      className="overflow-x-hidden text-center select-none"
                      style={{ textOverflow: 'ellipsis' }}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div
      className="w-full pb-32 overflow-y-scroll bg-gray"
      style={{ paddingLeft: '18em' }}
    >
      {tableData === [] ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-y-auto">
          <Table />
        </div>
      )}
    </div>
  );
};

export default AudioCollection;
