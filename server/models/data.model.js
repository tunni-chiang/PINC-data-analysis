const db = require("../db/database");

// custom helpers
const States = require("../helper/status_format");

const DataModel = {};

DataModel.read = async () => {
  let status = States.status400("Not enough information to read", 200);

  try {
    const base =
      "SELECT anon_id, major, ethnicity, sex, pell_eligible_desc, parent_educ_stat, level, semester, course, grade, course_name FROM overview_info;";
    let [result] = await db.query(base);
    if (!result || result.length === 0) throw new Error("Database Error");
    status = States.status200(result, "Successfully gathered data", 200);
  } catch (error) {
    status = States.status400("Connection Error", 200);
  }

  return status;
};

module.exports = DataModel;
