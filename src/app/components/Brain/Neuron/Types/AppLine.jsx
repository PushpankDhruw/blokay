import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const colors = ["#6249ff", "#ff4848", "#65a30d", "#4f46e5", "#c026d3"];
function AppLine({ data, title = "" }) {
  const dataLine = {
    labels: data.labels,
    datasets: data.datasets.map((row, index) => ({
      label: row.label,
      data: row.vals,
      borderColor: colors[index],
      backgroundColor: colors[index],
    })),
  };

  const options = {
    elements: {
      line: {
        tension: 0.4,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <div className="">
      <Line options={options} data={dataLine} />
    </div>
  );
}

export default AppLine;
