import React, { useEffect, useState } from 'react';

export default function withDimensions(Component) {
  return function RenderComponent(props) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    const updateWindowDimensions = () => {
      const { innerWidth: width, innerHeight: height } = window;

      setDimensions({ width, height });
    };

    useEffect(() => {
      updateWindowDimensions();
      window.addEventListener('resize', updateWindowDimensions);

      return () => {
        window.removeEventListener('resize', updateWindowDimensions);
      };
    }, []);

    return (
      <Component
        windowWidth={dimensions.width}
        windowHeight={dimensions.height}
        isMobile={dimensions.width < 768}
        {...props}
      />
    );
  };
}
