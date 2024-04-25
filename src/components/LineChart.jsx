

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let myChart;

    if (chartRef && chartRef.current) {
      myChart = new Chart(chartRef.current, {
        type: 'line',
        data: data,
        options: options,
      });

      // Draw intersection point values after chart creation
      drawIntersectionPointValues(myChart);

      return () => {
        myChart.destroy();
      };
    }
  }, [data, options]);

  // Function to draw intersection point values
  const drawIntersectionPointValues = (chart) => {
    const ctx = chart.ctx;
    const datasets = chart.data.datasets;
    const labels = chart.data.labels;
    const meta = chart.getDatasetMeta(0); // Assuming only one dataset

    meta.data.forEach((element, index) => {
      const value = labels[index];
      const dataValue = datasets[0].data[index];
      const xPosition = element.x;
      const yPosition = element.y;
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.fillText(`(${value}, ${dataValue})`, xPosition, yPosition - 10); // Adjust the vertical position as needed
    });
  };

  return <canvas ref={chartRef} />;
};

export default LineChart;
