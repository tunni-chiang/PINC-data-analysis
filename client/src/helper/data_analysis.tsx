export function sortBySemester(semesters: string[]) {
  let seasons: any = { Winter: 1, Spring: 2, Summer: 3, Fall: 4 };
  console.log("data_analysis -> sortBySemester - semesters: ", semesters);
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
  console.log("data_analysis -> demographicAndYear - demo_query: ", demo_query);
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
  for (let course of courses) {
    let temp_course_info = dataset.filter(
      (d: any) => d.course_name.replace(/\s/g, "") === course
    );
    console.log(
      "data_analysis -> demographicAndYear - temp_course_info: ",
      temp_course_info
    );
    temp = [...temp, ...temp_course_info];
    console.log("data_analysis -> demographicAndYear - temp: ", temp);
  }

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

  console.log("data_analysis -> demographicAndYear - datasets: ", datasets);
  console.log(
    "data_analysis -> demographicAndYear - semester_labels: ",
    semester_labels
  );

  return { datasets: datasets, labels: semester_labels };
}
