import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../asset/nodata.json';

function NoData() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, 
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
}

export default  NoData;
