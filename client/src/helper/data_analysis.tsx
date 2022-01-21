export function sortBySemester(semesters: string[]) {
  let seasons: any = { Winter: 1, Spring: 2, Summer: 3, Fall: 4 };

  return semesters.sort((a, b) => {
    let aa: any = a.split(" ");
    let bb: any = b.split(" ");
    return aa[1] - bb[1] || seasons[aa[0]] - seasons[bb[0]];
  });
}

export function demographicAndYear(dataset: any, demo_query: string, courses: string[]) {
  // colors
  let colors = ["#BF045B", "#365949", "#F26D3D", "#88BF8B", "#05131C", "#4B8696", "#768FA0"];
  let temp: any = [];

  // filter data for needed courses
  for (let course of courses) {
    let temp_course_info = dataset.filter((d: any) => d.course_name === course);
    temp = [...temp, ...temp_course_info];
  }

  // get sets to only use the data that we need
  let semester_labels: string[] = Array.from(new Set(temp.map((item: any) => item.semester)));
  let demographic_labels: string[] = Array.from(new Set(temp.map((item: any) => item[demo_query])));

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
        temp.filter((d: any) => d[demo_query] === demographic && d.semester === sem).length
    );

    result.backgroundColor = colors[datasets.length % colors.length];

    datasets.push(result);
  }

  return { datasets: datasets, labels: semester_labels };
}
