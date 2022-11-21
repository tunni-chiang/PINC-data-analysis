// export function sortBySemester(semesters: string[]) {
//   let seasons: any = { Winter: 1, Spring: 2, Summer: 3, Fall: 4 };
//   // console.log("data_analysis -> sortBySemester - semesters: ", semesters);
//   return semesters.sort((a, b) => {
//     if (a != null && b != null) {
//       let aa: any = a.split(" ");
//       let bb: any = b.split(" ");
//       return aa[1] - bb[1] || seasons[aa[0]] - seasons[bb[0]];
//     }
//     return 0;
//   });
// }

export function sortBySemester(semesters: string[]) {
  let seasons: any = { Winter: 1, Spring: 2, Summer: 3, Fall: 4 };
  return semesters.sort((a, b) => {
    if (a != null && b != null) {
      let charsA: any = a.slice(0, a.search(/\d/));
      let numbsA: any = a.replace(charsA, "");
      let charsB: any = b.slice(0, b.search(/\d/));
      let numbsB: any = b.replace(charsB, "");

      if (numbsA < numbsB) return -1;
      else if (numbsA > numbsB) return 1;
      else {
        if (seasons[charsA] < seasons[charsB]) return -1;
        else if (seasons[charsA] > seasons[charsB]) return 1;
      }
    }
    return 0;
  });
}

export function getTotal(dataset: any, courses: string[]) {
  let temp: any = [];

  for (let i = 1; i < courses.length; i += 2) {
    if (temp.length == 0) {
      // console.log("init....");
      temp = dataset.filter(
        (d: any) =>
          d.course_name.replace(/\s/g, "") === courses[i - 1] ||
          d.course_name.replace(/\s/g, "") === courses[i]
      );
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

  if (courses[0] == "CSC699" || courses[1] == "CSC699") {
    let temp_course_info = dataset.filter(
      (d: any) =>
        d.course_name.replace(/\s/g, "") === "CSC508" ||
        d.course_name.replace(/\s/g, "") === "CSC509"
    );

    temp = [...temp, ...temp_course_info];
  }

  console.log("final temp: ", temp);
  return temp.length;
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

  for (let i = 1; i < courses.length; i += 2) {
    if (temp.length == 0) {
      // console.log("init....");
      temp = dataset.filter(
        (d: any) =>
          d.course_name.replace(/\s/g, "") === courses[i - 1] ||
          d.course_name.replace(/\s/g, "") === courses[i]
      );
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

  if (courses[0] == "CSC699" || courses[1] == "CSC699") {
    let temp_course_info = dataset.filter(
      (d: any) =>
        d.course_name.replace(/\s/g, "") === "CSC508" ||
        d.course_name.replace(/\s/g, "") === "CSC509"
    );

    temp = [...temp, ...temp_course_info];
  }

  console.log("final temp: ", temp);

  // get sets to only use the data that we need
  let semester_labels: string[] = Array.from(
    new Set(temp.map((item: any) => item.semester))
  );
  let demographic_labels: string[] = Array.from(
    new Set(temp.map((item: any) => item[demo_query]))
  );

  // sort semester labels
  console.log("semester_labels (after sorting): ", semester_labels);
  semester_labels = sortBySemester(semester_labels);
  console.log("semester_labels (before sorting): ", semester_labels);
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

  return { datasets: datasets, labels: semester_labels, total: temp.length };
}
