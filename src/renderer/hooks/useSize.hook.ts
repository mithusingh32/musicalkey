/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import useResizeObserver from '@react-hook/resize-observer';

const useSize = (target: React.MutableRefObject<any | null>) => {
  const [size, setSize] = React.useState<DOMRectReadOnly>();

  React.useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect());
  }, [target]);

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};

export default useSize;
