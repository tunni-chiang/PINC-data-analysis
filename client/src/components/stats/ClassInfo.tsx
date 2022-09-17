import React, { useState } from "react";
import mountain from "../../assets/dashboard_banner.jpg";
import "./classinfo.css";
function ClassInfo({ class_name, image_src, select_cb, courses, activeDefault }: any) {
  if (activeDefault == undefined) activeDefault = false;

  let [active, setActive] = useState<boolean>(activeDefault);

  const handle_click = () => {
    select_cb((state: any) => {
      let storage = [];
      let clone = [...state];

      let to_remove = new Set();

      for (let course of courses) {
        if (state.includes(course)) {
          to_remove.add(course);
        }
      }

      if (to_remove.size > 0) {
        for (let i = 0; i < state.length; i++) {
          if (to_remove.has(state[i])) {
            console.log("skiped" + storage[i]);
            continue;
          }

          storage.push(state[i]);
        }
        // console.log("--------lmao---------");
        // console.log(to_remove);
        // console.log(storage);
        // console.log(to_remove.has("CSC308"));
        setActive(false);
        return [...storage];
      } else {
        setActive(true);
        return [...state, ...courses];
      }
    });
  };

  return (
    <a
      href="#current_graph_scroll"
      className="class_info"
      onClick={() => handle_click()}
      style={{ backgroundImage: `url(${mountain})` }}
    >
      <div className={`class_name ${active ? "course_selected" : ""}`}>
        <p className="class_name_text">{class_name}</p>
      </div>
    </a>
  );
}

export default ClassInfo;
