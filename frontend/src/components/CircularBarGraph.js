// CircularBarGraph.js
import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularBarGraph = ({ percentage }) => {
  return (
    <div className="circular-bar-graph">
      <CircularProgressbar value={percentage} text={`${percentage}%`} />
    </div>
  );
};

export default CircularBarGraph;
