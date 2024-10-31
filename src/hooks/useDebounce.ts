import debounce from 'lodash/debounce';
import { useRef, useEffect, useMemo } from 'react';

/**
 * @param callback: the callback function to be debounced
 * @param timeout: the timeout value for the debounce function
 * @returns debouncedCallback: the debounced callback function
 */

// hook to safely use lodash debounce
// to avoid cases where debounce becomes essentially just a delayed function call
function useDebounce(callback: (...args: any) => any, timeout: number = 500) {
  const ref = useRef<any>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = (...args: any) => {
      ref.current?.(...args);
    };

    return debounce(func, timeout);
  }, [timeout]);

  return debouncedCallback;
}

export default useDebounce;
