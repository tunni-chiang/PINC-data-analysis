import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPincData,
  selectData,
  selectDataExists,
} from "../../../store/slices/dataSlice";
import { demographicAndYear } from "../../../helper/data_analysis";
import { reverse_search } from "../settings";
import "./graphs.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getData = (dataset: any, demographic: string, courses: string[]) => {
  console.log("StackedBar - dataset: ", dataset);
  console.log("StackedBar - demographic: ", demographic);
  console.log("StackedBar - courses: ", courses);
  let data = demographicAndYear(dataset, demographic, courses);
  console.log("StackedBar - data: ", data);

  return data;
};

const getOptions = (demographic: string, courses: string[]) => {
  const options = {
    plugins: {
      title: {
        display: true,
        text: `${reverse_search[demographic]} analysis of ${courses.join(
          " and "
        )}`,
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  return options;
};

export function StackedBar({ ref_cb, courses, demographic }: any) {
  const dataset = useSelector(selectData);

  return (
    <div style={{ height: "200px", width: "70%" }}>
      {dataset && (
        <>
          <Bar
            id="current_graph"
            options={getOptions(demographic, courses)}
            data={getData(dataset, demographic, courses)}
            ref={ref_cb}
          />
          <div id="current_graph_scroll" className="spacer"></div>
        </>
      )}
    </div>
  );
}

export default StackedBar;
