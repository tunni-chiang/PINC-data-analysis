export function sortBySemester(semesters: string[]) {
  let seasons: any = { Winter: 1, Spring: 2, Summer: 3, Fall: 4 };
  // console.log("data_analysis -> sortBySemester - semesters: ", semesters);
  return semesters.sort((a, b) => {
    if (a != null && b != null) {
      let aa: any = a.split(" ");
      let bb: any = b.split(" ");
      return aa[1] - bb[1] || seasons[aa[0]] - seasons[bb[0]];
    }
    return 0;
  });
}

export function demographicAndYear(
  dataset: any,
  demo_query: string,
  courses: string[]
) {
  // verifiying arguments
  console.log("data_analysis -> demographicAndYear - dataset: ", dataset);
  // console.log("data_analysis -> demographicAndYear - demo_query: ", demo_query);
  console.log("data_analysis -> demographicAndYear - courses: ", courses);

  // colors
  let colors = [
    "#BF045B",
    "#365949",
    "#F26D3D",
    "#88BF8B",
    "#05131C",
    "#4B8696",
    "#768FA0",
  ];
  let temp: any = [];

  // filter data for needed courses

  // Actual Program

  for (let i = 1; i < courses.length; i += 2) {
    if (temp.length == 0) {
      // console.log("init....");
      temp = dataset.filter(
        (d: any) =>
          d.course_name.replace(/\s/g, "") === courses[i - 1] ||
          d.course_name.replace(/\s/g, "") === courses[i]
      );
      // console.log("max size: ", temp.length);
    } else {
      // console.log("after init....");
      let temp_course_info = dataset.filter(
        (d: any) =>
          d.course_name.replace(/\s/g, "") === courses[i - 1] ||
          d.course_name.replace(/\s/g, "") === courses[i]
      );

      // console.log("before temp_course_info: ", temp_course_info);
      temp_course_info = temp_course_info.filter((o1: any) =>
        temp.some((o2: any) => o1.anon_id === o2.anon_id)
      );
      // console.log("after temp_course_info: ", temp_course_info);

      // console.log("before temp: ", temp);
      temp = temp.filter((o1: any) =>
        temp_course_info.some((o2: any) => o1.anon_id === o2.anon_id)
      );
      // console.log("after temp: ", temp);

      temp = temp.concat(temp_course_info);
    }
  }

  console.log("final temp: ", temp);

  // 1. get the anon_id_filter
  // let anon_id_filter: any = [];
  // for (let i = 1; i < courses.length; i += 2) {
  //   let temp_course_info = dataset.filter(
  //     (d: any) =>
  //       d.course_name.replace(/\s/g, "") === courses[i - 1] ||
  //       d.course_name.replace(/\s/g, "") === courses[i]
  //   );
  //   if (temp_course_info.length != 0) {
  //     for (let course_info of temp_course_info) {
  //       if (anon_id_filter.length == 0) {
  //         anon_id_filter.push(course_info.anon_id);
  //       } else {
  //         if (!anon_id_filter.includes(course_info.anon_id)) {
  //           anon_id_filter.splice(
  //             anon_id_filter.indexOf(course_info.anon_id),
  //             1
  //           );
  //         }
  //       }
  //     }
  //   }
  // }

  // 2. apply filter of course on dataset
  // for (let course of courses) {
  //   let temp_course_info = dataset.filter(
  //     (d: any) => d.course_name.replace(/\s/g, "") === course
  //   );
  //   temp = [...temp, ...temp_course_info];
  // }

  // 3. apply filter of anon_id on temp
  // for (let temp_data of temp) {
  //   if (!anon_id_filter.includes(temp_data.anon_id)) {
  //     temp.splice(temp.indexOf(temp_data), 1);
  //   }
  // }

  // get sets to only use the data that we need
  let semester_labels: string[] = Array.from(
    new Set(temp.map((item: any) => item.semester))
  );
  let demographic_labels: string[] = Array.from(
    new Set(temp.map((item: any) => item[demo_query]))
  );

  // sort semester labels
  semester_labels = sortBySemester(semester_labels);

  // consists of array of objects which hold data for each demographic
  let datasets: any = [];

  // build data for chartjs
  for (let demographic of demographic_labels) {
    let result: any = {};

    result.label = demographic;

    result.data = semester_labels.map(
      (sem: string) =>
        temp.filter(
          (d: any) => d[demo_query] === demographic && d.semester === sem
        ).length
    );

    result.backgroundColor = colors[datasets.length % colors.length];

    datasets.push(result);
  }

  return { datasets: datasets, labels: semester_labels };
}
