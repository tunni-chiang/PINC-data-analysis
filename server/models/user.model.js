const db = require("../db/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// custom helpers
const States = require("../helper/status_format");
const Cleanup = require("../helper/object_cleanup");

const UserModel = {};

/*
Format of custom status400 and status200
Type StatusCode = {
  code: number,
  success: boolean,
  message: string,
  data: Object,
}
*/

UserModel.create = async (username, password, token) => {
  let status = States.status400();

  token = token.toUpperCase();

  const hashed = await bcrypt.hash(password, 15);

  let tokenExists = await UserModel.tokenExists(token);

  if (!tokenExists) {
    status = States.status400("Invalid Referral Token", 209);
    return status;
  }

  let userExists = await UserModel.existsUsername(username);

  // if username exists return user exists error
  if (userExists) {
    status = States.status400("Username already exists", 209);
    return status;
  }

  try {
    // user is ready to insert into database since there are no conflicts
    const referral_token = crypto.randomBytes(3).toString("hex").toUpperCase();
    const base = "INSERT INTO user (username, password, referral_token) VALUES (?, ?, ?);";
    const [result] = await db.query(base, [username, hashed, referral_token]);
    if (!result) throw new Error("Database Error");

    // sending success status with code 201 since user was created
    const userId = await UserModel.getUserId(username);
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

    status = States.status200({ username, token }, "Successfully created new user", 201);
  } catch (err) {
    console.log(err);
    status = States.status400("Error creating user");
  }

  return status;
};

UserModel.authenticate = async (username, password) => {
  let status = States.status400();
  let userExists = await UserModel.existsUsername(username);

  if (!userExists) {
    status = States.status400("Incorrect username or password", 200);
    return status;
  }

  try {
    const base = "SELECT id, username, password FROM user where username=?;";
    let [result] = await db.query(base, [username]);

    if (!result && result.length === 0) throw new Error("Database Error");

    const passwordsMatch = await bcrypt.compare(password, result[0].password);

    if (!passwordsMatch) {
      status = States.status400("Incorrect username or password", 200);
      return status;
    }

    const userId = result[0].id;

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
    status = await UserModel.read(userId);

    // tailoring status for later use
    status.message = "User has been authenticated";
    status.data.token = token;
  } catch (err) {
    console.log(err);
    status = States.status400("Error authenticating user");
  }

  return status;
};

UserModel.read = async (id) => {
  let status = States.status400();

  try {
    // read necessary info needed by the frontend
    const base = "SELECT id, username, email, referral_token FROM user where id=?;";

    let [result] = await db.query(base, [id]);
    if (!result) throw new Error("Database Error");

    // sending success status with code 200
    status = States.status200(result[0], "Successfully collected user info");
  } catch (err) {
    console.log(err);
    status = States.status400("Error collecting user info");
  }

  return status;
};

UserModel.update = async (id, options, allowedOptions) => {
  // data cleanup and safe sql query building
  let normalizedOptions = Cleanup.normalize(options, allowedOptions);
  const setters = Cleanup.repeat(" ? ", normalizedOptions.length);
  normalizedOptions.push(id);
  let status = States.status400();

  try {
    const base = "UPDATE  user SET " + setters + " WHERE id=?";
    let [result] = await db.query(base, normalizedOptions);

    // if the affected rows is 0 then nothing was updated
    if (!result || result.affectedRows === 0) throw new Error("Database Error");

    // return the updated user info to possibly update the frontend
    status = await UserModel.read(id);
  } catch (err) {
    console.log(err);
    status = States.status400("Error collecting user info");
  }

  return status;
};

UserModel.delete = async (id) => {
  let status = States.status400();

  try {
    const base = "DELETE FROM user WHERE id=?;";
    const [result] = await db.query(base, [id]);

    if (!result || result.affectedRows === 0) {
      status = States.status400("No user found to delete");
      return status;
    }

    status = States.status200(result[0], "Successfully deleted user info");
  } catch (err) {
    console.log(err);
    status = States.status400("Error deleting user info");
  }

  return status;
};

UserModel.existsId = async (id) => {
  // no status format, returns true or false
  try {
    const base = "SELECT count(1) as doesExist from user WHERE id=?;";
    const [result] = await db.query(base, [id]);
    if (!result && result.length === 0) return false;
    return result[0].doesExist;
  } catch (err) {
    console.log(err);

    return false;
  }
};

UserModel.tokenExists = async (token) => {
  // no status format, returns true or false
  try {
    const base = "SELECT count(1) as doesExist from user WHERE referral_token=?;";
    const [result] = await db.query(base, [token]);
    if (!result && result.length === 0) return false;
    return result[0].doesExist;
  } catch (err) {
    console.log(err);
    return false;
  }
};

UserModel.existsUsername = async (username) => {
  // no status format, returns true or false
  try {
    const base = "SELECT count(1) as doesExist from user WHERE username=?;";
    const [result] = await db.query(base, [username]);
    if (!result && result.length === 0) return false;
    return result[0].doesExist;
  } catch (err) {
    console.log(err);

    return false;
  }
};

UserModel.getUserId = async (username) => {
  // no status format, returns user id if exists

  try {
    const base = "SELECT id from user WHERE username=?;";
    const [result] = await db.query(base, [username]);
    if (!result && result.length === 0) return false;

    return result[0].id;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = UserModel;
