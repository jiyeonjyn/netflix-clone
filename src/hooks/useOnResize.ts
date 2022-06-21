import { useEffect } from 'react';
import { debounce } from 'lodash';

export const useOnResize = (callback: (offset: number) => void) => {
  useEffect(() => {
    const listener = debounce((e: any) => {
      const windowWidth = e.target.innerWidth;
      callback(windowWidth > 1400 ? 6 : windowWidth > 900 ? 4 : 2);
    }, 500);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [callback]);
};
