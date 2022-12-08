import { useEffect } from 'react';

const useOnClickOutside = (refs, callback, { isMobile = false, disableOnDesktop = false }) => {
  const undefinedRefs = refs.filter((ref) => !!ref?.current === false);
  const listener = (event) => {
    const matchRefs = refs.filter((ref) => ref?.current.contains(event.target));

    if (undefinedRefs.length !== 0 || matchRefs.length === 1) {
      return;
    }

    callback(event);
  };

  useEffect(() => {
    if (isMobile) {
      document.addEventListener('touchstart', listener);
    } else if (!disableOnDesktop) {
      document.addEventListener('mousedown', listener);
    }

    return () => {
      if (isMobile) {
        document.removeEventListener('touchstart', listener);
      } else if (!disableOnDesktop) {
        document.removeEventListener('mousedown', listener);
      }
    };
  }, [refs, callback, isMobile]);
};

export default useOnClickOutside;
