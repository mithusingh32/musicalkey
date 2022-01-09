import * as React from 'react';

import { mockPlaylists } from '../../../../mockdata';

const Playlist = ({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
}) => {
  const onKeyHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onClick();
  };
  return (
    <div
      className={`my-2 ${active ? 'text-gray-500' : 'text'}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyHandler}
    >
      {children}
    </div>
  );
};

const AddPlaylist = ({
  addPlaylistFunction,
}: {
  addPlaylistFunction: (inPlaylistName: string | undefined) => void;
}) => {
  const [addPlaylist, setAddPlaylist] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') setAddPlaylist(true);
  };
  const inputOnKeyHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (
        inputRef.current?.value !== '' ||
        inputRef.current?.value !== undefined ||
        inputRef.current?.value !== null
      ) {
        // This logic will be handlded in redux
        addPlaylistFunction(inputRef.current?.value);
        setAddPlaylist(false);
      }
    }
  };
  return (
    <div className="my-2">
      {!addPlaylist ? (
        <span
          role="button"
          onClick={() => {
            setAddPlaylist(true);
          }}
          onKeyDown={onEnter}
          tabIndex={0}
        >
          + Add Playlist
        </span>
      ) : (
        <input type="text" onKeyDown={inputOnKeyHandler} ref={inputRef} />
      )}
    </div>
  );
};

const Playlists = () => {
  const [playlists, setPlaylists] = React.useState(mockPlaylists);
  const [activePlaylist, setActivePlaylist] = React.useState(0);
  // This logic will be handlded in redux
  const newPlaylistHandler = (inPlaylist: string | undefined) => {
    const largestKey = Math.max(
      ...Object.keys(playlists).map((key) => parseInt(key, 10))
    );
    const newKey = largestKey + 1;
    const newPlaylist = {
      ...playlists,
      [newKey]: {
        id: `${newKey}`,
        name: inPlaylist,
      },
    };
    setPlaylists(newPlaylist);
  };
  return (
    <div className="relative flex flex-col w-full ml-2 overflow-auto h-96">
      <div className="flex-1">
        <AddPlaylist addPlaylistFunction={newPlaylistHandler} />
        {Object.entries(playlists).map((playlist: any) => {
          return (
            <Playlist
              onClick={() => {
                setActivePlaylist(parseInt(playlist[0], 10));
              }}
              key={playlist[0]}
              active={parseInt(playlist[0], 10) === activePlaylist}
            >
              {playlist[1].name}
            </Playlist>
          );
        })}
      </div>
    </div>
  );
};

export default Playlists;
