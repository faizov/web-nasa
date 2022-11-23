import React from "react";

export const Mars = () => {
  return (
    <div style={{marginTop: 30}}>
      <iframe
        src="https://mars.nasa.gov/layout/embed/image/mslweather/"
        width="100%"
        height="700"
        scrolling="no"
        frameBorder="0"
      ></iframe>
    </div>
  );
};
