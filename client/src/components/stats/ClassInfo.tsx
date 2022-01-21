import React from "react";
import mountain from "../../assets/dashboard_banner.jpg";
import "./classinfo.css";
function ClassInfo({ class_name, image_src, select_cb, courses }: any) {
  return (
    <a
      href="#current_graph_scroll"
      className="class_info"
      onClick={() => select_cb(courses)}
      style={{ backgroundImage: `url(${mountain})` }}
    >
      <div className="class_name">
        <p className="class_name_text">{class_name}</p>
      </div>
    </a>
  );
}

export default ClassInfo;
