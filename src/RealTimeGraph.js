import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

// Define chart options
const options = {
  scales: {
    x: {
      title: {
        display: true,
        text: 'User',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Activity',
      },
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `Activity: ${context.raw}`;
        },
      },
    },
  },
};

const RealTimeGraph = ({ data }) => {
  // Data for the graph
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'User Activity',
        data: [],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderWidth: 1,
        fill: true,
      },
    ],
  });

  useEffect(() => {
    // Update chart data with new data
    setChartData({
      labels: data.map(item => item.label),
      datasets: [
        {
          label: 'User Activity',
          data: data.map(item => item.value),
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          borderWidth: 1,
          fill: true,
        },
      ],
    });
  }, [data]);

  return (
    <div className="card border-dark">
      <div className="card-header bg-primary text-white">
        <h5 className="card-title mb-0">Real-Time User Activity</h5>
      </div>
      <div className="card-body">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RealTimeGraph;
