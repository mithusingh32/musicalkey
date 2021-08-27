/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import {
  useTable,
  useSortBy,
  Column,
  useResizeColumns,
  useFlexLayout,
} from 'react-table';
import { AudioData } from '../../interfaces/audio.interface';

export interface TableData {
  [index: number]: { id: string; key: string; doc: AudioData };
}

const Table = ({
  data,
  tableSize,
}: {
  data: any;
  tableSize: DOMRectReadOnly | undefined;
}) => {
  const [headerWidth, setHeaderWidth] = React.useState<number | undefined>(
    undefined
  );
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
        minWidth: 50,
        maxWidth: 80,
      },
      {
        id: 'camelotWheelKey',
        Header: 'Key',
        accessor: (originalRow: any) =>
          `${originalRow.doc.camelotWheelKey}-${originalRow.doc.chordName}`,
        minWidth: 50,
        maxWidth: 80,
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
        minWidth: 50,
        maxWidth: 80,
      },
    ],
    []
  );

  React.useEffect(() => {
    if (tableSize !== undefined) setHeaderWidth(tableSize.width);
  }, [tableSize]);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
        initialState: {
          hiddenColumns: ['id', 'key', 'location', 'error', 'chordName'],
        },
      },
      useFlexLayout,
      useResizeColumns,
      useSortBy
    );

  return (
    <div className="w-full ">
      <div {...getTableProps()} className="table">
        <div
          className="fixed z-50"
          style={{
            display: 'block',
            width: headerWidth === undefined ? '100%' : headerWidth,
          }}
        >
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column: any) => (
                <div
                  {...column.getHeaderProps()}
                  className="top-0 font-medium tracking-wider text-gray-500 uppercase cursor-pointer th bg-gray-50"
                >
                  {column.render('Header')}
                  {/* Use column.getResizerProps to hook up the events correctly */}
                  <div {...column.getResizerProps()} className="resizer" />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()} className="pt-10">
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <div
                {...row.getRowProps()}
                className={`
              hover:bg-gray-200
              cursor-default ${
                index % 2 === 0 ? 'bg-gray-300' : 'bg-gray-400'
              }`}
              >
                {row.cells.map((cell) => {
                  return (
                    <div
                      {...cell.getCellProps()}
                      className="text-center select-none td"
                    >
                      {cell.render('Cell')}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Table;
