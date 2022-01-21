import "./filteroptions.css";
import { demographic_options } from "./settings";

function FilterOptions({ select_demographic_cb }: any) {
  const visual_options = ["Graph", "Plot"];

  return (
    <div className="filter_options">
      <p>Demographic Factor</p>
      <select className="filter_select">
        {Object.entries(demographic_options).map(([key, value]) => (
          <option value={value} onClick={(e: any) => select_demographic_cb(e.target.value)}>
            {key}
          </option>
        ))}
      </select>
      <p>Visual Representation</p>
      <select className="filter_select">
        {visual_options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default FilterOptions;
